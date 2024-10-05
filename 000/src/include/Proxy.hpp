#ifndef _PROXY_H_
#define _PROXY_H_

class Subject {
public:
  virtual ~Subject() = default;
  virtual void Request() = 0;

protected:
  Subject() = default;

private:
};

class ConcreteSubject : public Subject {
public:
  ConcreteSubject() = default;
  ~ConcreteSubject() = default;
  void Request();

private:
};

class Proxy {
public:
  Proxy() = default;
  ~Proxy();
  Proxy(Subject *sub);
  void Request();

private:
  Subject *_sub;
};

#endif // !_PROXY_H_
