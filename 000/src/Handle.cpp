#include "include/Handle.hpp"
#include <iostream>
using namespace std;

Handle::Handle() { _succ = 0; }
Handle::~Handle() { delete _succ; }
Handle::Handle(Handle *succ) { this->_succ = succ; }
void Handle::SetSuccessor(Handle *succ) { _succ = succ; }
Handle *Handle::GetSuccessor() { return _succ; }
void Handle::HandleRequest() {}
ConcreteHandleA::ConcreteHandleA(Handle *succ) : Handle(succ) {}
void ConcreteHandleA::HandleRequest() {
  if (this->GetSuccessor() != 0) {
    cout << "ConcreteHandleA was delegated to the next node..." << endl;
    this->GetSuccessor()->HandleRequest();
  } else {
    cout << "ConcreteHandleA doesn't have next node, handled by itself..."
         << endl;
  }
}
ConcreteHandleB::ConcreteHandleB(Handle *succ) : Handle(succ) {}
void ConcreteHandleB::HandleRequest() {
  if (this->GetSuccessor() != 0) {
    cout << "ConcreteHandleB was delegated to the next node..." << endl;
    this->GetSuccessor()->HandleRequest();
  } else {
    cout << "ConcreteHandleB doesn't have next node, handled by itself..."
         << endl;
  }
}
