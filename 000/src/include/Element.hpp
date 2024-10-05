#ifndef _ELEMENT_H_
#define _ELEMENT_H_

class Visitor;
class Element {
public:
  virtual ~Element() = default;
  virtual void Accept(Visitor *vis) = 0;

protected:
  Element() = default;

private:
};

class ConcreteElementA : public Element {
public:
  ConcreteElementA() = default;
  ~ConcreteElementA() = default;
  void Accept(Visitor *vis);

private:
};

class ConcreteElementB : public Element {
public:
  ConcreteElementB() = default;
  ~ConcreteElementB() = default;
  void Accept(Visitor *vis);

private:
};

#endif // !_ELEMENT_H_
