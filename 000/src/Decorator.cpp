#include "include/Decorator.h"
#include <iostream>

void Component::Operation() {}

void ConcreteComponent::Operation() {
  std::cout << "ConcreteComponent operation..." << std::endl;
}

Decorator::Decorator(Component *com) { this->_com = com; }

Decorator::~Decorator() { delete _com; }

void Decorator::Operation() {}

ConcreteDecorator::ConcreteDecorator(Component *com) : Decorator(com) {}

void ConcreteDecorator::AddedBehavior() {
  std::cout << "ConcreteDecorator::AddedBehavior..." << std::endl;
}

void ConcreteDecorator::Operation() {
  _com->Operation();
  this->AddedBehavior();
}
