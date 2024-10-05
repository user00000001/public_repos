#ifndef _ABSTRACTFACTORY_H_
#define _ABSTRACTFACTORY_H_

class AbstractProductA;
class AbstractProductB;

class AbstractFactory {
protected:
  AbstractFactory() = default;

public:
  virtual AbstractProductA *CreateProductA() = 0;
  virtual AbstractProductB *CreateProductB() = 0;
  virtual ~AbstractFactory() = default;
};

class ConcreteFactory1 : public AbstractFactory {
public:
  ConcreteFactory1() = default;
  ~ConcreteFactory1() = default;
  AbstractProductA *CreateProductA();
  AbstractProductB *CreateProductB();
};

class ConcreteFactory2 : public AbstractFactory {
public:
  ConcreteFactory2() = default;
  ~ConcreteFactory2() = default;
  AbstractProductA *CreateProductA();
  AbstractProductB *CreateProductB();
};

#endif // _ABSTRACTFACTORY_H_
