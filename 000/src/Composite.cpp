#include "include/Composite.hpp"
#include "include/Component.hpp"
#include <algorithm>
#include <vector>

void Composite::Operation() {
  std::vector<Component *>::iterator comIter = comVec.begin();
  for (; comIter != comVec.end(); comIter++) {
    (*comIter)->Operation();
  }
}

void Composite::Add(Component *com) { comVec.push_back(com); }

void Composite::Remove(Component *com) {
  std::vector<Component *>::iterator itor =
      std::remove(comVec.begin(), comVec.end(), com);
  comVec.erase(itor, comVec.end());
}

Component *Composite::GetChild(int index) { return comVec[index]; }
