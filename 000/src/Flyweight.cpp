#include "include/Flyweight.hpp"
#include <iostream>

using namespace std;

Flyweight::Flyweight(string intrinsicState) {
  this->_intrinsicState = intrinsicState;
}

void Flyweight::Operation(const string &extrinsicState) {}

string Flyweight::GetIntrinsicState() { return this->_intrinsicState; }

ConcreteFlyweight::ConcreteFlyweight(string intrinsicState)
    : Flyweight(intrinsicState) {
  cout << "ConcreteFlyweight Build......" << intrinsicState << endl;
}

void ConcreteFlyweight::Operation(const string &extrinsicState) {
  cout << "ConcreteFlyweight: inside[" << this->GetIntrinsicState()
       << "], outside[" << extrinsicState << "]" << endl;
}
