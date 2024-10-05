#ifndef _P1RODUCT_H_
#define _P1RODUCT_H_

class P1roduct {
public:
  P1roduct();
  ~P1roduct() = default;
  void ProducePart();

private:
};

class P1roductPart {
public:
  P1roductPart();
  ~P1roductPart() = default;
  P1roductPart *BuildPart();

private:
};

#endif // !_P1RODUCT_H_
