#ifndef _ITERPRET_H_
#define _ITERPRET_H_

#include "C2ontext.hpp"
#include <string>

using namespace std;

class AbstractExpression {
public:
  virtual ~AbstractExpression() = default;
  virtual void Interpret(const C2ontext &c);

protected:
  AbstractExpression() = default;

private:
};

class TerminalExpression : public AbstractExpression {
public:
  TerminalExpression(const string &statement);
  ~TerminalExpression() = default;
  void Interpret(const C2ontext &c);

private:
  string _statement;
};

class NonterminalExpression : public AbstractExpression {
public:
  NonterminalExpression(AbstractExpression *expression, int times);
  ~NonterminalExpression() = default;
  void Interpret(const C2ontext &c);

private:
  AbstractExpression *_expression;
  int _times;
};

#endif // !_ITERPRET_H_
