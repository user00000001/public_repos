#include "include/Factory.hpp"
#include "include/Product.hpp"
#include <iostream>

using namespace std;

ConcreteFactory::ConcreteFactory() {
  cout << "ConcreteFactory..." << endl;
}

Product * ConcreteFactory::CreateProduct() {
  return new ConcreteProduct();
}