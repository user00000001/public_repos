#include "include/Colleage.hpp"
#include "include/Mediator.hpp"
#include <iostream>
using namespace std;

Colleage::Colleage(Mediator *mdt) { this->_mdt = mdt; }
ConcreteColleageA::ConcreteColleageA(Mediator *mdt) : Colleage(mdt) {}
string ConcreteColleageA::GetState() { return _sdt; }
void ConcreteColleageA::SetState(const string &sdt) { _sdt = sdt; }
void ConcreteColleageA::Action() {
  _mdt->DoActionFromAtoB();
  cout << "State of ConcreteColleageA: \n" << this->GetState() << endl;
}
ConcreteColleageB::ConcreteColleageB(Mediator *mdt) : Colleage(mdt) {}
string ConcreteColleageB::GetState() { return _sdt; }
void ConcreteColleageB::SetState(const string &sdt) { _sdt = sdt; }
void ConcreteColleageB::Action() {
  _mdt->DoActionFromBtoA();
  cout << "State of ConcreteColleageB: \n" << this->GetState() << endl;
}
