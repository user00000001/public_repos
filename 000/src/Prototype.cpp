#include "include/Prototype.h"
#include <iostream>
using namespace std;

Prototype *Prototype::Clone() const { return 0; }

ConcretePrototype::ConcretePrototype(const ConcretePrototype &cp) {
  cout << "ConcretePrototype copy ..." << endl;
}

Prototype *ConcretePrototype::Clone() const {
  return new ConcretePrototype(*this);
}
