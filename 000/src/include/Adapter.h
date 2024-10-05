#ifndef _ADAPTER_H_
#define _ADAPTER_H_

class Target {
public:
  Target() = default;
  virtual void Request();
  virtual ~Target() = default;

private:
};

class Adaptee {
public:
  Adaptee() = default;
  void SpecificRequest();
  ~Adaptee() = default;

private:
};

class Adapter : public Target, private Adaptee {
public:
  Adapter() = default;
  ~Adapter() = default;
  void Request();

private:
};

#endif // !_ADAPTER_H_
