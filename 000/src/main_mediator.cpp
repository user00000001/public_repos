#include "include/Colleage.hpp"
#include "include/Mediator.hpp"

#include <iostream>
using namespace std;

int main(int argc, char *argv[]) {
  ConcreteMediator *m = new ConcreteMediator();
  ConcreteColleageA *c1 = new ConcreteColleageA(m);
  ConcreteColleageB *c2 = new ConcreteColleageB(m);
  m->IntroColleage(c1, c2);
  c1->SetState("old");
  c2->SetState("old");
  c1->Action();
  c2->Action();
  cout << endl;

  c1->SetState("new");
  c1->Action();
  c2->Action();
  cout << endl;

  c2->SetState("old");
  c2->Action();
  c1->Action();
  return 0;
}
