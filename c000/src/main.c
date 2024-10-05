#include <stdio.h>

void byteorder();

int main(int argc, char const *argv[])
{
    byteorder();
    return 0;
}

void byteorder()
{
    union BO
    {
        short value;
        char union_bytes[sizeof(short)];

    } bo;
    bo.value = 0x0102;
    if ((bo.union_bytes[0] == 1) && (bo.union_bytes[1] == 2))
    {
        printf("big endian\n");
    }
    else if ((bo.union_bytes[0] == 2) && (bo.union_bytes[1] == 1))
    {
        printf("litte endian\n");
    }
    else
    {
        printf("unknown..");
    }
}
