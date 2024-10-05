#ifndef _MEDIATOR_H_
#define _MEDIATOR_H_

class Colleage;

class Mediator {
public:
  virtual ~Mediator() = default;
  virtual void DoActionFromAtoB() = 0;
  virtual void DoActionFromBtoA() = 0;

protected:
  Mediator() = default;

private:
};

class ConcreteMediator : public Mediator {
public:
  ConcreteMediator() = default;
  ConcreteMediator(Colleage *clgA, Colleage *clgB);
  ~ConcreteMediator() = default;
  void SetConcreteColleageA(Colleage *clgA);
  void SetConcreteColleageB(Colleage *clgB);
  Colleage *GetConcreteColleageA();
  Colleage *GetConcreteColleageB();
  void IntroColleage(Colleage *clgA, Colleage *clgB);
  void DoActionFromBtoA();
  void DoActionFromAtoB();

private:
  Colleage *_clgA;
  Colleage *_clgB;
};

#endif // !_MEDIATOR_H_
