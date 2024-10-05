#include "include/P1roduct.hpp"
#include <iostream>

using namespace std;

P1roduct::P1roduct() {
  ProducePart();
  cout << "return a product" << endl;
}

void P1roduct::ProducePart() { cout << "build part of product." << endl; }

P1roductPart::P1roductPart() {
  // cout << "build product part." << endl;
}

P1roductPart *P1roductPart::BuildPart() { return new P1roductPart; }
