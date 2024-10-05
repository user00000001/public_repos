#include "include/FlyweightFactory.hpp"
int main(int argc, char *argv[]) {
  FlyweightFactory *fc = new FlyweightFactory();
  Flyweight *fw1 = fc->GetFlyWeight("hello");
  Flyweight *fw2 = fc->GetFlyWeight("world!");
  Flyweight *fw3 = fc->GetFlyWeight("hello");
  return 0;
}
