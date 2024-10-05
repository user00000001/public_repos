#ifndef _SUBJECT_H_
#define _SUBJECT_H_
#include <list>
#include <string>
using namespace std;
typedef string S1tate;
class Observer;
class S1ubject {
public:
  virtual ~S1ubject() = default;
  virtual void Attach(Observer *obv);
  virtual void Detach(Observer *obv);
  virtual void Notify();
  virtual void SetState(const S1tate &st) = 0;
  virtual S1tate GetState() = 0;

protected:
  S1ubject();

private:
  list<Observer *> *_obvs;
};

class ConcreteS1ubject : public S1ubject {
public:
  ConcreteS1ubject();
  ~ConcreteS1ubject() = default;
  S1tate GetState();
  void SetState(const S1tate &st);

private:
  S1tate _st;
};

#endif // !_SUBJECT_H_
