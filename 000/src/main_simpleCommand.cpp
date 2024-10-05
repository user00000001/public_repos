#include "include/Command.hpp"
#include "include/Reciever.hpp"
int main(int argc, char *argv[]) {
  Reciever *rev = new Reciever();
  Command *cmd = new SimpleCommand<Reciever>(rev, &Reciever::Action);
  cmd->Execute();
  return 0;
}
