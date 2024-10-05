#include "include/Invoker.hpp"
#include "include/Command.hpp"
Invoker::Invoker(Command *cmd) : _cmd(cmd) {}
Invoker::~Invoker() { delete _cmd; }
void Invoker::Invoke() { _cmd->Execute(); }
