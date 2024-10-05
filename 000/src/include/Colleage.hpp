#ifndef _COLLEAGE_H_
#define _COLLEAGE_H_
#include <string>
using namespace std;
class Mediator;
class Colleage {
public:
  virtual ~Colleage() = default;
  virtual void Action() = 0;
  virtual void SetState(const string &sdt) = 0;
  virtual string GetState() = 0;

protected:
  Colleage() = default;
  Colleage(Mediator *mdt);
  Mediator *_mdt;

private:
};

class ConcreteColleageA : public Colleage {
public:
  ConcreteColleageA() = default;
  ConcreteColleageA(Mediator *);
  ~ConcreteColleageA() = default;
  void Action();
  void SetState(const string &sdt);
  string GetState();

private:
  string _sdt;
};

class ConcreteColleageB : public Colleage {
public:
  ConcreteColleageB() = default;
  ConcreteColleageB(Mediator *);
  ~ConcreteColleageB() = default;
  void Action();
  void SetState(const string &sdt);
  string GetState();

private:
  string _sdt;
};
#endif // !_COLLEAGE_H_
