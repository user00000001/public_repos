#ifndef _FLYWEIGHTFACTORY_H_
#define _FLYWEIGHTFACTORY_H_

#include "Flyweight.hpp"
#include <string>
#include <vector>
using namespace std;

class FlyweightFactory {
public:
  FlyweightFactory() = default;
  ~FlyweightFactory() = default;
  Flyweight *GetFlyWeight(const string &key);

private:
  vector<Flyweight *> _fly;
};

#endif // !_FLYWEIGHTFACTORY_H_
