#include "include/Element.hpp"
#include "include/Vistor.hpp"
#include <iostream>
using namespace std;

void ConcreteVisitorA::VisitConcreteElementA(Element *elm) {
  cout << "I will visit ConcreteElementA..." << endl;
}
void ConcreteVisitorA::VisitConcreteElementB(Element *elm) {
  cout << "I will visit ConcreteElementB..." << endl;
}
void ConcreteVisitorB::VisitConcreteElementA(Element *elm) {
  cout << "I will visit ConcreteElementA..." << endl;
}
void ConcreteVisitorB::VisitConcreteElementB(Element *elm) {
  cout << "I will visit ConcreteElementB..." << endl;
}
