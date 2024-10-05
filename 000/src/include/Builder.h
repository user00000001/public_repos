#ifndef _BUILDER_H_
#define _BUILDER_H_
#include <string>
using namespace std;
class P1roduct;

class Builder {
public:
  virtual void BuildPartA(const string &buildPara) = 0;
  virtual void BuildPartB(const string &buildPara) = 0;
  virtual void BuildPartC(const string &buildPara) = 0;
  virtual P1roduct *GetProduct() = 0;
  virtual ~Builder() = default;

protected:
  Builder() = default;

private:
};

class ConcreteBuilder : public Builder {
public:
  ConcreteBuilder() = default;
  ~ConcreteBuilder() = default;
  void BuildPartA(const string &buildPara);
  void BuildPartB(const string &buildPara);
  void BuildPartC(const string &buildPara);
  P1roduct *GetProduct();

private:
};

#endif // !_BUILDER_H_
