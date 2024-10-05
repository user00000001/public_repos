#include "include/Builder.h"
#include "include/Director.h"

using namespace std;

int main(int argc, char *argv[]) {
  Director *d = new Director(new ConcreteBuilder());
  d->Construct();
  return 0;
}
