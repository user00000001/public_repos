#include "include/C1ontext.hpp"
#include "include/State.hpp"

C1ontext::C1ontext(State *state) { this->_state = state; }

C1ontext::~C1ontext() { delete _state; }

void C1ontext::OperationInterface() { _state->OperationInterface(this); }

bool C1ontext::ChangeState(State *state) {
  if (nullptr != this->_state)
    delete this->_state;
  this->_state = state;
  return true;
}

void C1ontext::OperationChangeState() { _state->OperationChangeState(this); }
