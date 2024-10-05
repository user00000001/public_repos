#ifndef _STRATEGY_H_
#define _STRATEGY_H_

class Strategy {
public:
  Strategy() = default;
  virtual ~Strategy();
  virtual void AlgrithmInterface() = 0;

private:
};

class ConcreteStrategyA : public Strategy {
public:
  ConcreteStrategyA() = default;
  virtual ~ConcreteStrategyA();
  void AlgrithmInterface();

private:
};

class ConcreteStrategyB : public Strategy {
public:
  ConcreteStrategyB() = default;
  virtual ~ConcreteStrategyB();
  void AlgrithmInterface();

private:
};

#endif // !_STRATEGY_H_
