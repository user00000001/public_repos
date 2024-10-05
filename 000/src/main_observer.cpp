#include "include/Observer.hpp"
#include "include/Subject.hpp"
int main(int argc, char *argv[]) {
  ConcreteS1ubject *sub = new ConcreteS1ubject();
  Observer *o1 = new ConcreteObserverA(sub);
  Observer *o2 = new ConcreteObserverB(sub);
  sub->SetState("old");
  sub->Notify();
  sub->SetState("new");
  sub->Notify();
  return 0;
}
