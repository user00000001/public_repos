#ifndef _A1DAPTER_H_
#define _A1DAPTER_H_

class T1arget {
public:
  T1arget() = default;
  virtual void Request();
  virtual ~T1arget() = default;

private:
};

class A1daptee {
public:
  A1daptee() = default;
  void SpecificRequest();
  ~A1daptee() = default;

private:
};

class A1dapter : public T1arget {
public:
  A1dapter(A1daptee *ade);
  ~A1dapter() = default;
  void Request();

private:
  A1daptee *_ade;
};

#endif // !_A1DAPTER_H_
