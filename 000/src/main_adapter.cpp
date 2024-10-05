#include "include/Adapter.h"
int main(int argc, char *argv[]) {
  Target *adt = new Adapter();
  adt->Request();
  return 0;
}
