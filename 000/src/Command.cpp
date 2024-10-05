#include "include/Command.hpp"
#include "include/Reciever.hpp"
#include <iostream>
void Command::Execute() {}
ConcreteCommand::ConcreteCommand(Reciever *rev) { this->_rev = rev; }
ConcreteCommand::~ConcreteCommand() { delete this->_rev; }
void ConcreteCommand::Execute() {
  _rev->Action();
  std::cout << "ConcreteCommand..." << std::endl;
}
