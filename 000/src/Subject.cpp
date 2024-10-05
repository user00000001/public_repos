#include "include/Subject.hpp"
#include "include/Observer.hpp"
#include <list>
#include <string>
using namespace std;
typedef string S1tate;

S1ubject::S1ubject() { _obvs = new list<Observer *>; }
void S1ubject::Attach(Observer *obv) { _obvs->push_front(obv); }
void S1ubject::Detach(Observer *obv) {
  if (obv != nullptr)
    _obvs->remove(obv);
}
void S1ubject::Notify() {
  list<Observer *>::iterator it;
  it = _obvs->begin();
  for (; it != _obvs->end(); it++) {
    (*it)->Update(this);
  }
}

ConcreteS1ubject::ConcreteS1ubject() { _st = '\0'; }
S1tate ConcreteS1ubject::GetState() { return _st; }
void ConcreteS1ubject::SetState(const S1tate &st) { _st = st; }
