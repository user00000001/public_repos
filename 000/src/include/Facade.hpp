#ifndef _FACEDE_H_
#define _FACEDE_H_

class Subsystem1 {
public:
  Subsystem1() = default;
  ~Subsystem1() = default;
  void Operation();

private:
};

class Subsystem2 {
public:
  Subsystem2() = default;
  ~Subsystem2() = default;
  void Operation();

private:
};

class Facade {
public:
  Facade() noexcept;
  ~Facade();
  void OperationWrapper();

private:
  Subsystem1 *_subs1;
  Subsystem2 *_subs2;
};

#endif // !_FACEDE_H_
