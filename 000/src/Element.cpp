#include "include/Element.hpp"
#include "include/Vistor.hpp"
#include <iostream>
using namespace std;
void Element::Accept(Visitor *vis) {}
void ConcreteElementA::Accept(Visitor *vis) {
  vis->VisitConcreteElementA(this);
  cout << "Visiting ConcreteElementA..." << endl;
}
void ConcreteElementB::Accept(Visitor *vis) {
  vis->VisitConcreteElementB(this);
  cout << "Visiting ConcreteElementB..." << endl;
}
