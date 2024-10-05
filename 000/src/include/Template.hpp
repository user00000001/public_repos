#ifndef _TEMPLATE_H_
#define _TEMPLATE_H_

class AbstractClass {
public:
  virtual ~AbstractClass() = default;
  void TemplateMethod();

protected:
  virtual void PrimitiveOperation1() = 0;
  virtual void PrimitiveOperation2() = 0;
  AbstractClass() = default;

private:
};

class ConcreteClass1 : public AbstractClass {
public:
  ConcreteClass1() = default;
  ~ConcreteClass1() = default;

protected:
  void PrimitiveOperation1();
  void PrimitiveOperation2();
};

class ConcreteClass2 : public AbstractClass {
public:
  ConcreteClass2() = default;
  ~ConcreteClass2() = default;

protected:
  void PrimitiveOperation1();
  void PrimitiveOperation2();
};

#endif // !_TEMPLATE_H_
