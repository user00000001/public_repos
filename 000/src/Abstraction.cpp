#include "include/Abstraction.h"
#include "include/AbstractionImp.h"

using namespace std;

RefinedAbstraction::RefinedAbstraction(AbstractionImp *imp) { _imp = imp; }

void RefinedAbstraction::Operation() { _imp->Operation(); }
