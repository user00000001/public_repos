#include "include/C2ontext.hpp"
#include "include/Iterpret.hpp"
#include <iostream>

using namespace std;

void AbstractExpression::Interpret(const C2ontext &c) {}
TerminalExpression::TerminalExpression(const string &statement) {
  this->_statement = statement;
}
void TerminalExpression::Interpret(const C2ontext &c) {
  cout << this->_statement << " TerminalExpression" << endl;
}
NonterminalExpression::NonterminalExpression(AbstractExpression *expression,
                                             int times) {
  this->_expression = expression;
  this->_times = times;
}
void NonterminalExpression::Interpret(const C2ontext &c) {
  for (int i = 0; i < _times; i++) {
    this->_expression->Interpret(c);
  }
}
