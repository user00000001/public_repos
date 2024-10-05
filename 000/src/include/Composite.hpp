#ifndef _COMPOSITE_H_
#define _COMPOSITE_H_

#include "Component.hpp"
#include <vector>

class Composite : public Component {
public:
  Composite() = default;
  ~Composite() = default;
  void Operation();
  void Add(Component *com);
  void Remove(Component *com);
  Component *GetChild(int index);

private:
  std::vector<Component *> comVec;
};

#endif // !_COMPOSITE_H_
