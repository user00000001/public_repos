#include "include/Builder.h"
#include "include/P1roduct.hpp"
#include <iostream>
using namespace std;

void ConcreteBuilder::BuildPartA(const string &buildPara) {
  cout << "Step1: Build PartA..." << buildPara << endl;
}
void ConcreteBuilder::BuildPartB(const string &buildPara) {
  cout << "Step2: Build PartB..." << buildPara << endl;
}
void ConcreteBuilder::BuildPartC(const string &buildPara) {
  cout << "Step3: Build PartC..." << buildPara << endl;
}

P1roduct *ConcreteBuilder::GetProduct() {
  BuildPartA("pre-defined");
  BuildPartB("pre-defined");
  BuildPartC("pre-defined");
  return new P1roduct();
}
