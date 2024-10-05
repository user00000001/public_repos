#include "include/Context.hpp"
#include "include/Strategy.hpp"

int main(int argc, char *argv[]) {
  Strategy *ps = new ConcreteStrategyA();
  Context *pc = new Context(ps);
  pc->DoAction();
  if (nullptr != pc)
    delete pc;
  return 0;
}
