#include <iostream>
#include <fstream>
#include <vector>
#include <random>
#include <string>

// 生成测试用的二进制数据文件
void generate_test_data(const std::string& filename, size_t num_floats) {
    // 生成随机浮点数数据
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_real_distribution<float> dis(-100.0f, 100.0f);
    
    std::vector<float> data(num_floats);
    for (size_t i = 0; i < num_floats; ++i) {
        data[i] = dis(gen);
    }
    
    // 写入二进制文件
    std::ofstream file(filename, std::ios::binary);
    if (!file) {
        throw std::runtime_error("Cannot create test file: " + filename);
    }
    
    file.write(reinterpret_cast<const char*>(data.data()), 
               data.size() * sizeof(float));
    
    std::cout << "Generated test file '" << filename 
              << "' with " << num_floats << " floats (" 
              << data.size() * sizeof(float) << " bytes)" << std::endl;
}

int main(int argc, char* argv[]) {
    if (argc < 3) {
        std::cout << "Usage: " << argv[0] << " <output_file> <num_floats>" << std::endl;
        std::cout << "Example: " << argv[0] << " test_data.bin 10000" << std::endl;
        return 1;
    }
    
    try {
        std::string output_file = argv[1];
        size_t num_floats = std::stoull(argv[2]);
        
        generate_test_data(output_file, num_floats);
        std::cout << "Test data generation completed!" << std::endl;
    }
    catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        return 1;
    }
    
    return 0;
}