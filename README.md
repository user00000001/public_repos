# 包含windows PPL + cuda处理过程的，异步hdfs文件的读写简略处理说明

## 代码基于AI工具生成，仅仅作功能说明

## ./generate_test_data.cpp 使用随机数填充指定大小的文件，
## ./cuda_processor.cu cuda程序源码，extern "C"导出以供ffi调用，之前也在linux下编译学习过cuda编程入门源码 https://github.com/Tony-Tan/CUDA_Freshman
## ./hdfs_stub.h hdfs相关头文件，具体看使用什么平台什么库，集成到源码, 链接时指定相应hdfs库
## ./CMakeLists.txt cmake处理编译过程，里用了linux下的路径，windows上要使用windows的文件路径
## ./hdfs_cuda_pipeline.cpp 程序主源码，采用异步方式，读hdfs uri，传入cuda，cuda输出写入hdfs uri，少了文件系统上的操作.

## 自己对AI编程工具大环境下，对编码工作的理解:
### 它能解决编程工作中百分之七八十的内容(既包括工作量，也包括工作难度)，只要你使用得当，对所做业务有较为全面的理解，能文字解释出来，加上自身经验对架构的指示，基本上就能产生一个模板工程，再审查下代码，处理一些细节问题(编译，特别地方的具体实现等)，一些繁杂测试代码，配套脚本问题，都能快速解决。不需要计较各类编程语言的固定语法，也能开展相关业务(前提要对涉及技术有基本入门，能审查代码，知道实现内容，能针对具体环节上手修改)，
