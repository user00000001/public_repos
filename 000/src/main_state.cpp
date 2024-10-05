#include "include/C1ontext.hpp"
#include "include/State.hpp"

int main(int argc, char *argv[]) {
  State *st = new ConcreteStateA();
  C1ontext *con = new C1ontext(st);
  con->OperationChangeState();
  con->OperationChangeState();
  con->OperationChangeState();
  if (con != nullptr)
    delete con;
  if (nullptr != st)
    st = nullptr;
  return 0;
}
