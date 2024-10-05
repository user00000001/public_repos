#include "include/Context.hpp"
#include "include/Strategy.hpp"

Context::Context(Strategy *stg) { _stg = stg; }

Context::~Context() {
  if (_stg)
    delete _stg;
}

void Context::DoAction() { _stg->AlgrithmInterface(); }
