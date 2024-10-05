#include "include/Command.hpp"
#include "include/Invoker.hpp"
#include "include/Reciever.hpp"
int main(int argc, char *argv[]) {
  Reciever *rev = new Reciever();
  Command *cmd = new ConcreteCommand(rev);
  Invoker *inv = new Invoker(cmd);
  inv->Invoke();
  return 0;
}
