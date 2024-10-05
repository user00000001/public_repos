#include "include/Adapter.h"
#include <iostream>

void Target::Request() { std::cout << "Target::Request" << std::endl; }

void Adaptee::SpecificRequest() {
  std::cout << "Adaptee::SpecificRequest" << std::endl;
}

void Adapter::Request() { this->SpecificRequest(); }
