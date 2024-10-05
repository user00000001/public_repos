#ifndef _MEMENTO_H_
#define _MEMENTO_H_

#include <string>
using namespace std;
class Memento;
class Originator {
public:
  typedef string State;
  Originator();
  Originator(const State &sdt);
  ~Originator() = default;
  Memento *CreateMemento();
  void SetMemento(Memento *men);
  void RestoreToMemento(Memento *mt);
  State GetState();
  void SetState(const State &sdt);
  void PrintState();

private:
  State _sdt;
  Memento *_mt;
};

class Memento {
private:
  friend class Originator;
  typedef string State;
  Memento() = default;
  Memento(const State &sdt);
  ~Memento() = default;
  void SetState(const State &sdt);
  State GetState();
  State _sdt;
};

#endif // !_MEMENTO_H_
