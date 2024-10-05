#ifndef _ABSTRACTION_H_
#define _ABSTRACTION_H_

class AbstractionImp;

class Abstraction {
public:
  virtual void Operation() = 0;
  virtual ~Abstraction() = default;

protected:
  Abstraction() = default;

private:
};

class RefinedAbstraction : public Abstraction {
public:
  RefinedAbstraction(AbstractionImp *imp);
  ~RefinedAbstraction() = default;
  void Operation();

private:
  AbstractionImp *_imp;
};

#endif // !_ABSTRACTION_H_
