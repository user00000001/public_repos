#ifndef _OBSERVER_H_
#define _OBSERVER_H_
#include "Subject.hpp"
#include <string>
using namespace std;
typedef string S1tate;

class Observer {
public:
  virtual void Update(S1ubject *sub) = 0;
  virtual void PrintInfo() = 0;
  virtual ~Observer() = default;

protected:
  Observer();
  S1tate _st;

private:
};

class ConcreteObserverA : public Observer {
public:
  virtual S1ubject *GetSubject();
  ConcreteObserverA(S1ubject *sub);
  virtual ~ConcreteObserverA();
  void Update(S1ubject *sub);
  void PrintInfo();

private:
  S1ubject *_sub;
};

class ConcreteObserverB : public Observer {
public:
  virtual S1ubject *GetSubject();
  ConcreteObserverB(S1ubject *sub);
  virtual ~ConcreteObserverB();
  void Update(S1ubject *sub);
  void PrintInfo();

private:
  S1ubject *_sub;
};

#endif // !_OBSERVER_H_
