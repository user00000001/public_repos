#include "include/A1dapter.h"
#include <iostream>

void T1arget::Request() { std::cout << "T1arget::Request" << std::endl; }

void A1daptee::SpecificRequest() {
  std::cout << "A1daptee::SpecificRequest" << std::endl;
}

A1dapter::A1dapter(A1daptee *ade) { this->_ade = ade; }

void A1dapter::Request() { _ade->SpecificRequest(); }
