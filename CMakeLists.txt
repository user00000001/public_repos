cmake_minimum_required(VERSION 3.18)
project(HDFSCUDAProcessor)

# 设置C++标准
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 检查CUDA
find_package(CUDA REQUIRED)
find_package(CUDAToolkit REQUIRED)

# 寻找HDFS库 (假设通过包管理器或手动安装)
# 实际使用时可能需要调整路径
find_path(HDFS_INCLUDE_DIR hdfs.h
    PATHS /usr/include
          /usr/local/include
          /opt/hadoop/include)

find_library(HDFS_LIBRARIES hdfs
    PATHS /usr/lib
          /usr/local/lib
          /opt/hadoop/lib)

if(NOT HDFS_INCLUDE_DIR OR NOT HDFS_LIBRARIES)
    message(WARNING "HDFS library not found. You may need to install Hadoop development libraries.")
endif()

# 启用CUDA语言支持
enable_language(CUDA)

# 设置CUDA架构 (根据目标GPU调整)
set(CMAKE_CUDA_ARCHITECTURES 60 61 70 75 80 86)

# 添加可执行文件
add_executable(hdfs_cuda_pipeline
    hdfs_cuda_pipeline.cpp
    cuda_processor.cu
)

add_executable(generate_test_data
    generate_test_data.cpp
)

# 设置CUDA编译选项
set_property(TARGET hdfs_cuda_pipeline 
    PROPERTY CUDA_SEPARABLE_COMPILATION ON)

# 链接库
target_link_libraries(hdfs_cuda_pipeline 
    ${HDFS_LIBRARIES}
    ${CUDAToolkit_LIBRARIES}
)

# 包含目录
target_include_directories(hdfs_cuda_pipeline PRIVATE
    ${HDFS_INCLUDE_DIR}
    ${CUDAToolkit_INCLUDE_DIRS}
)

# 设置编译选项
if(MSVC)
    target_compile_options(hdfs_cuda_pipeline PRIVATE
        /W4
        /MP    # 并行构建
    )
else()
    target_compile_options(hdfs_cuda_pipeline PRIVATE
        -Wall -Wextra -Wpedantic
    )
endif()

# 输出信息
message(STATUS "HDFS Include Directory: ${HDFS_INCLUDE_DIR}")
message(STATUS "HDFS Libraries: ${HDFS_LIBRARIES}")