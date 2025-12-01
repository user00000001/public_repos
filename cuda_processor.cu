#include <cuda_runtime.h>
#include <device_launch_parameters.h>
#include <stdio.h>

// CUDA核函数 - 示例：对数组中的每个元素执行平方操作
__global__ void process_kernel(float* input, float* output, size_t size) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    
    if (idx < size) {
        // 示例计算：将输入值平方后乘以2
        output[idx] = input[idx] * input[idx] * 2.0f;
    }
}

// CUDA错误检查宏
#define CUDA_CHECK(call) \
    do { \
        cudaError_t error = call; \
        if (error != cudaSuccess) { \
            fprintf(stderr, "CUDA error at %s:%d - %s\n", __FILE__, __LINE__, \
                    cudaGetErrorString(error)); \
            return error; \
        } \
    } while(0)

// CUDA处理函数实现
extern "C" {
    // 主处理函数
    cudaError_t cuda_process_data(float* input, float* output, size_t size) {
        float *d_input = nullptr;
        float *d_output = nullptr;
        cudaError_t result = cudaSuccess;
        
        // 分配GPU内存
        CUDA_CHECK(cudaMalloc(&d_input, size * sizeof(float)));
        CUDA_CHECK(cudaMalloc(&d_output, size * sizeof(float)));
        
        // 将输入数据复制到GPU
        CUDA_CHECK(cudaMemcpy(d_input, input, size * sizeof(float), cudaMemcpyHostToDevice));
        
        // 计算网格和块尺寸
        int blockSize = 256;
        int gridSize = (size + blockSize - 1) / blockSize;
        
        // 启动CUDA核函数
        process_kernel<<<gridSize, blockSize>>>(d_input, d_output, size);
        
        // 检查核函数执行错误
        CUDA_CHECK(cudaGetLastError());
        CUDA_CHECK(cudaDeviceSynchronize());
        
        // 将结果从GPU复制回主机
        CUDA_CHECK(cudaMemcpy(output, d_output, size * sizeof(float), cudaMemcpyDeviceToHost));
        
    cleanup:
        // 释放GPU内存
        if (d_input) cudaFree(d_input);
        if (d_output) cudaFree(d_output);
        
        return result;
    }
    
    // 用于从C++调用的包装函数
    void cuda_process_data_wrapper(float* input, float* output, size_t size) {
        cudaError_t result = cuda_process_data(input, output, size);
        if (result != cudaSuccess) {
            fprintf(stderr, "CUDA processing failed with error: %s\n", cudaGetErrorString(result));
        }
    }
}