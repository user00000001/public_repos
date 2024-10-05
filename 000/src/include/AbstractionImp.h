#ifndef _ABSTRACTIONIMP_H_
#define _ABSTRACTIONIMP_H_

class AbstractionImp {
public:
  virtual ~AbstractionImp() = default;
  virtual void Operation() = 0;

protected:
  AbstractionImp() = default;

private:
};

class ConcreteAbstractionImpA : public AbstractionImp {
public:
  ConcreteAbstractionImpA() = default;
  ~ConcreteAbstractionImpA() = default;
  virtual void Operation();

private:
};

class ConcreteAbstractionImpB : public AbstractionImp {
public:
  ConcreteAbstractionImpB() = default;
  ~ConcreteAbstractionImpB() = default;
  virtual void Operation();

private:
};

#endif // !_ABSTRACTIONIMP_H_
