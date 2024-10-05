#include "include/Director.h"
#include "include/Builder.h"

Director::Director(Builder *bld) { _bld = bld; }

void Director::Construct() {
  _bld->BuildPartA("user-defined");
  _bld->BuildPartB("user-defined");
  _bld->BuildPartC("user-defined");
}
