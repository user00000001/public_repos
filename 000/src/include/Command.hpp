#ifndef _COMMAND_H_
#define _COMMAND_H_

class Reciever;
class Command {
public:
  virtual ~Command() = default;
  virtual void Execute() = 0;

protected:
  Command() = default;
};

class ConcreteCommand : public Command {
public:
  ConcreteCommand(Reciever *rev);
  ~ConcreteCommand();
  void Execute();

private:
  Reciever *_rev;
};

template <class Reciever> class SimpleCommand : public Command {
public:
  typedef void (Reciever::*Action)();
  ;
  SimpleCommand(Reciever *rev, Action act) {
    _rev = rev;
    _act = act;
  }
  virtual void Execute() { (_rev->*_act)(); }
  ~SimpleCommand() { delete _rev; }

private:
  Reciever *_rev;
  Action _act;
};

#endif // !_COMMAND_H_
