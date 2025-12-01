#ifndef HDFS_STUB_H
#define HDFS_STUB_H

// 这是一个简化版的HDFS接口定义，用于在没有实际HDFS环境时编译代码
// 在实际部署时，应该使用真正的HDFS头文件

#include <stdint.h>

// 类型定义
typedef struct hdfs_internal *hdfsFS;
typedef struct hdfs_file_internal *hdfsFile;

// 文件打开标志
#define O_RDONLY 1
#define O_WRONLY 2
#define O_RDWR   4

// HDFS文件信息结构
struct hdfsFileInfo {
    int16_t mKind;              // 文件还是目录
    char *mName;                // 文件名
    int64_t mSize;              // 文件大小
    int16_t mReplication;       // 副本数
    int64_t mBlockSize;         // 块大小
    int64_t mLastMod;           // 最后修改时间
    int64_t mLastAccess;        // 最后访问时间
    int32_t mPermission;        // 权限
    int32_t mOwner;             // 所有者
    int32_t mGroup;             // 组
};

// 偏移量类型
typedef int64_t tOffset;

// 函数声明 (这些函数需要链接到实际的HDFS库)
extern "C" {
    hdfsFS hdfsConnect(const char* host, tPort port);
    hdfsFS hdfsConnectAsUser(const char* host, tPort port, const char *user);
    hdfsFS hdfsConnectAsUserNewInstance(const char* host, tPort port, const char *user);
    hdfsFS hdfsBuilderConnect(hdfsBuilder *builder);
    int hdfsDisconnect(hdfsFS fs);
    
    hdfsFile hdfsOpenFile(hdfsFS fs, const char* path, int flags, int bufferSize, short replication, tOffset blockSize);
    int hdfsCloseFile(hdfsFS fs, hdfsFile file);
    
    tOffset hdfsRead(hdfsFS fs, hdfsFile file, void* buffer, tOffset length);
    tOffset hdfsPread(hdfsFS fs, hdfsFile file, tOffset position, void* buffer, tOffset length);
    tOffset hdfsWrite(hdfsFS fs, hdfsFile file, const void* buffer, tOffset length);
    
    int hdfsFlush(hdfsFS fs, hdfsFile file);
    
    struct hdfsFileInfo* hdfsGetPathInfo(hdfsFS fs, const char *path);
    void hdfsFreeFileInfo(struct hdfsFileInfo *hdfsFileInfo, int numEntries);
}

#endif // HDFS_STUB_H