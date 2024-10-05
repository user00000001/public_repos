#ifndef _VISITOR_H_
#define _VISITOR_H_

class Element;
class ConcreteElementA;
class ConcreteElementB;
class Visitor {
public:
  virtual void VisitConcreteElementA(Element *) = 0;
  virtual void VisitConcreteElementB(Element *) = 0;
  virtual ~Visitor() = default;

protected:
  Visitor() = default;

private:
};

class ConcreteVisitorA : public Visitor {
public:
  ConcreteVisitorA() = default;
  virtual ~ConcreteVisitorA() = default;
  virtual void VisitConcreteElementA(Element *);
  virtual void VisitConcreteElementB(Element *);
};

class ConcreteVisitorB : public Visitor {
public:
  ConcreteVisitorB() = default;
  virtual ~ConcreteVisitorB() = default;
  virtual void VisitConcreteElementA(Element *);
  virtual void VisitConcreteElementB(Element *);
};

#endif // !_VISITOR_H_
