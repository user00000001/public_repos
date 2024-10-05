#include "include/Template.hpp"
#include <iostream>

using namespace std;

void AbstractClass::TemplateMethod() {
  this->PrimitiveOperation1();
  this->PrimitiveOperation2();
}

void ConcreteClass1::PrimitiveOperation1() {
  cout << "ConcreteClass1...PrimitiveOperation1" << endl;
}
void ConcreteClass1::PrimitiveOperation2() {
  cout << "ConcreteClass1...PrimitiveOperation2" << endl;
}
void ConcreteClass2::PrimitiveOperation1() {
  cout << "ConcreteClass2...PrimitiveOperation1" << endl;
}
void ConcreteClass2::PrimitiveOperation2() {
  cout << "ConcreteClass2...PrimitiveOperation2" << endl;
}
