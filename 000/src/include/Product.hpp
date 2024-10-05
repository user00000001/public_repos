#ifndef _PRODUCT_H_
#define _PRODUCT_H_

class Product {
private:
  /* data */
protected:
  Product() = default;

public:
  virtual ~Product() = default;
};

class ConcreteProduct : public Product {
public:
  ConcreteProduct();
  ~ConcreteProduct() = default;
};

class AbstractProductA {
protected:
  AbstractProductA() = default;

public:
  virtual ~AbstractProductA() = default;
};

class AbstractProductB {
protected:
  AbstractProductB() = default;

public:
  virtual ~AbstractProductB() = default;
};

class ProductA1 : public AbstractProductA {
public:
  ProductA1();
  ~ProductA1() = default;
};

class ProductA2 : public AbstractProductA {
public:
  ProductA2();
  ~ProductA2() = default;
};

class ProductB1 : public AbstractProductB {
public:
  ProductB1();
  ~ProductB1() = default;
};

class ProductB2 : public AbstractProductB {
public:
  ProductB2();
  ~ProductB2() = default;
};

#endif // _PRODUCT_H_
