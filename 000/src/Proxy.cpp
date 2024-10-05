#include "include/Proxy.hpp"
#include <iostream>

using namespace std;

void ConcreteSubject::Request() {
  cout << "ConcreteSubject......request" << endl;
}

Proxy::Proxy(Subject *sub) { _sub = sub; }

Proxy::~Proxy() { delete _sub; }

void Proxy::Request() {
  cout << "Proxy request..." << endl;
  _sub->Request();
}
