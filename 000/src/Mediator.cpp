#include "include/Mediator.hpp"
#include "include/Colleage.hpp"

ConcreteMediator::ConcreteMediator(Colleage *clgA, Colleage *clgB) {
  this->_clgA = clgA;
  this->_clgB = clgB;
}
void ConcreteMediator::DoActionFromAtoB() {
  _clgB->SetState(_clgA->GetState());
}
void ConcreteMediator::SetConcreteColleageA(Colleage *clgA) {
  this->_clgA = clgA;
}
Colleage *ConcreteMediator::GetConcreteColleageA() { return this->_clgA; }
void ConcreteMediator::DoActionFromBtoA() {
  _clgA->SetState(_clgB->GetState());
}
void ConcreteMediator::SetConcreteColleageB(Colleage *clgB) {
  this->_clgB = clgB;
}
Colleage *ConcreteMediator::GetConcreteColleageB() { return this->_clgB; }
void ConcreteMediator::IntroColleage(Colleage *clgA, Colleage *clgB) {
  this->_clgA = clgA;
  this->_clgB = clgB;
}
