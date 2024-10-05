#include "include/FlyweightFactory.hpp"
#include "include/Flyweight.hpp"
#include <iostream>
#include <string>
#include <vector>

using namespace std;

Flyweight *FlyweightFactory::GetFlyWeight(const string &key) {
  vector<Flyweight *>::iterator it = _fly.begin();
  for (; it != _fly.end(); it++) {
    if ((*it)->GetIntrinsicState() == key) {
      cout << "already created by users...." << endl;
      return *it;
    }
  }
  Flyweight *fn = new ConcreteFlyweight(key);
  _fly.push_back(fn);
  return fn;
}
