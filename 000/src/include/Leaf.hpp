#ifndef _LEAF_H_
#define _LEAF_H_

#include "Component.hpp"

class Leaf : public Component {
public:
  Leaf() = default;
  ~Leaf() = default;
  void Operation();

private:
};

#endif // !_LEAF_H_
