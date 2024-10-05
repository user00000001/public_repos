#include "include/State.hpp"
#include "include/C1ontext.hpp"
#include <iostream>

using namespace std;

void State::OperationInterface(C1ontext *con) { cout << "State::.." << endl; }
bool State::ChangeState(C1ontext *con, State *st) {
  con->ChangeState(st);
  return true;
}
void State::OperationChangeState(C1ontext *con) {}

void ConcreteStateA::OperationInterface(C1ontext *con) {
  cout << "ConcreteStateA::OperationInterface......" << endl;
}
void ConcreteStateA::OperationChangeState(C1ontext *con) {
  OperationInterface(con);
  this->ChangeState(con, new ConcreteStateB());
}
void ConcreteStateB::OperationInterface(C1ontext *con) {
  cout << "ConcreteStateB::OperationInterface......" << endl;
}
void ConcreteStateB::OperationChangeState(C1ontext *con) {
  OperationInterface(con);
  this->ChangeState(con, new ConcreteStateA());
}
