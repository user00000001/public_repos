#include "include/AbstractFactory.hpp"
#include "include/Product.hpp"

using namespace std;

AbstractProductA *ConcreteFactory1::CreateProductA() { return new ProductA1(); }
AbstractProductB *ConcreteFactory1::CreateProductB() { return new ProductB1(); }
AbstractProductA *ConcreteFactory2::CreateProductA() { return new ProductA2(); }
AbstractProductB *ConcreteFactory2::CreateProductB() { return new ProductB2(); }
