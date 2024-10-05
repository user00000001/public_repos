#ifndef _FACTORY_H_
#define _FACTORY_H_

class Product;

class Factory {
private:
  /* data */
protected:
  Factory() = default;

public:
  virtual ~Factory() = default;
  virtual Product *CreateProduct() = 0;
};

class ConcreteFactory : public Factory {
private:
  /* data */
public:
  ConcreteFactory(/* args */);
  ~ConcreteFactory() = default;
  Product *CreateProduct();
};

#endif // _FACTORY_H_
