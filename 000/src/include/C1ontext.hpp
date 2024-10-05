#ifndef _C1ONTEXT_H_
#define _C1ONTEXT_H_

class State;

class C1ontext {
public:
  C1ontext() = default;
  ~C1ontext();
  C1ontext(State *state);
  void OperationInterface();
  void OperationChangeState();

private:
  friend class State;
  bool ChangeState(State *state);
  State *_state;
};

#endif // !_C1ONTEXT_H_
