#include "include/C2ontext.hpp"
#include "include/Iterpret.hpp"
int main(int argc, char *argv[]) {
  C2ontext *c = new C2ontext();
  AbstractExpression *te = new TerminalExpression("hello");
  AbstractExpression *nte = new NonterminalExpression(te, 2);
  nte->Interpret(*c);
  return 0;
}
