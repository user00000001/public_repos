#ifndef _PROTOTYPE_H_
#define _PROTOTYPE_H_

class Prototype {
public:
  virtual ~Prototype() = default;
  virtual Prototype *Clone() const = 0;

protected:
  Prototype() = default;
};

class ConcretePrototype : public Prototype {
public:
  ConcretePrototype() = default;
  ConcretePrototype(const ConcretePrototype &cp);
  ~ConcretePrototype() = default;
  Prototype *Clone() const;
};

#endif // !_PROTOTYPE_H_
