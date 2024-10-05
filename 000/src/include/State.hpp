#ifndef _STATE_H_
#define _STATE_H_

class C1ontext;
class State {
public:
  State() = default;
  virtual ~State() = default;
  virtual void OperationInterface(C1ontext *) = 0;
  virtual void OperationChangeState(C1ontext *) = 0;

protected:
  bool ChangeState(C1ontext *con, State *st);

private:
};

class ConcreteStateA : public State {
public:
  ConcreteStateA() = default;
  virtual ~ConcreteStateA() = default;
  virtual void OperationInterface(C1ontext *);
  virtual void OperationChangeState(C1ontext *);
};

class ConcreteStateB : public State {
public:
  ConcreteStateB() = default;
  virtual ~ConcreteStateB() = default;
  virtual void OperationInterface(C1ontext *);
  virtual void OperationChangeState(C1ontext *);
};

#endif // !_STATE_H_
