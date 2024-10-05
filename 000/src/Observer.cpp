#include "include/Observer.hpp"
#include "include/Subject.hpp"
#include <iostream>

using namespace std;

Observer::Observer() { _st = '\0'; }

ConcreteObserverA::ConcreteObserverA(S1ubject *sub) {
  _sub = sub;
  _sub->Attach(this);
}
ConcreteObserverA::~ConcreteObserverA() {
  _sub->Detach(this);
  if (_sub != 0)
    delete _sub;
}
S1ubject *ConcreteObserverA::GetSubject() { return _sub; }
void ConcreteObserverA::PrintInfo() {
  cout << "ConcreteObserverA observer...... " << _sub->GetState() << endl;
}
void ConcreteObserverA::Update(S1ubject(*sub)) {
  _st = sub->GetState();
  PrintInfo();
}

ConcreteObserverB::ConcreteObserverB(S1ubject *sub) {
  _sub = sub;
  _sub->Attach(this);
}
ConcreteObserverB::~ConcreteObserverB() {
  _sub->Detach(this);
  if (_sub != 0)
    delete _sub;
}
S1ubject *ConcreteObserverB::GetSubject() { return _sub; }
void ConcreteObserverB::PrintInfo() {
  cout << "ConcreteObserverB observer...... " << _sub->GetState() << endl;
}
void ConcreteObserverB::Update(S1ubject(*sub)) {
  _st = sub->GetState();
  PrintInfo();
}
