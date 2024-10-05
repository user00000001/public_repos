#include <pybind11/pybind11.h>
#include <iostream>

namespace py = pybind11;

template <typename T>
struct MyClass
{
private:
  /* data */
public:
  MyClass() = default;
  MyClass(T data) : data(data) {}
  ~MyClass() = default;
  T getData()
  {
    return data;
  }
  void setData(T d)
  {
    data = d;
  }
  T data;
};

void print_dict(const py::dict &d)
{
  for (auto item : d)
  {
    std::cout << "key: " << std::string(py::str(item.first)) << ", "
              << "value: " << std::string(py::str(item.second)) << std::endl;
  }
}

void generic(py::args args, py::kwargs &kwargs)
{
  int item_idx = 0;
  for (auto item : args)
  {
    std::cout << "key: " << item_idx << ", "
              << "value: " << std::string(py::str(item)) << std::endl;
    ++item_idx;
  }
  for (auto item = args.begin(); item != args.end(); ++item)
  {
    py::print(item[0]);
  }
  for (auto item : kwargs)
  {
    std::cout << "key: " << std::string(py::str(item.first)) << ", "
              << "value: " << std::string(py::str(item.second)) << std::endl;
  }
}

static struct MyClass<int> *_data = new MyClass<int>;

struct MyClass<int> *get_data()
{
  return _data;
}

class Cat
{
private:
  /* data */
public:
  Cat(/* args */) = default;
  ~Cat() = default;
};

class Dog
{
private:
  /* data */
public:
  Dog(/* args */) = default;
  ~Dog() = default;
};

namespace ns1
{
  class Animal
  {
  public:
    virtual ~Animal() = default;
    virtual std::string go(int n_times) = 0;
    virtual std::string name() { return "unknown"; }
  };

  class Dog : public Animal
  {
  public:
    std::string go(int n_times) override
    {
      std::string result;
      for (int i = 0; i < n_times; ++i)
        result += bark() + " ";
      return result;
    }
    virtual std::string bark() { return "woof!"; }
  };

  class PyDog : public Dog
  {
  public:
    using Dog::Dog;
    std::string go(int n_times) override
    {
      PYBIND11_OVERRIDE(std::string, Dog, go, n_times);
    }
    std::string name() override
    {
      PYBIND11_OVERRIDE(std::string, Dog, name, );
    }
    std::string bark() override
    {
      PYBIND11_OVERRIDE(std::string, Dog, bark, );
    }
  };

  class Husky : public Dog
  {
  };
  class PyHusky : public Husky
  {
  public:
    using Husky::Husky;
    std::string go(int n_times) override { PYBIND11_OVERRIDE_PURE(std::string, Husky, go, n_times); }
    std::string name() override { PYBIND11_OVERRIDE(std::string, Husky, name, ); }
    std::string bark() override { PYBIND11_OVERRIDE(std::string, Husky, bark, ); }
  };

  std::string call_go(Animal *animal)
  {
    return animal->go(3);
  }

  class PyAnimal : public Animal
  {
  public:
    using Animal::Animal;
    std::string go(int n_times) override
    {
      PYBIND11_OVERRIDE_PURE(
          std::string,
          Animal,
          go,
          n_times);
    }
    std::string name() override
    {
      PYBIND11_OVERRIDE(std::string, Animal, name);
    }
  };

  template <class AnimalBase = Animal>
  class PyAnimal1 : public AnimalBase
  {
  public:
    using AnimalBase::AnimalBase; // Inherit constructors
    std::string go(int n_times) override { PYBIND11_OVERRIDE_PURE(std::string, AnimalBase, go, n_times); }
    std::string name() override { PYBIND11_OVERRIDE(std::string, AnimalBase, name, ); }
  };
  
  template <class DogBase = Dog>
  class PyDog1 : public PyAnimal1<DogBase>
  {
  public:
    using PyAnimal1<DogBase>::PyAnimal1; // Inherit constructors
    // Override PyAnimal's pure virtual go() with a non-pure one:
    std::string go(int n_times) override { PYBIND11_OVERRIDE(std::string, DogBase, go, n_times); }
    std::string bark() override { PYBIND11_OVERRIDE(std::string, DogBase, bark, ); }
  };
}

PYBIND11_MODULE(example, m)
{
  m.doc() = "pybind11 samples";
  m.def("get_data", &get_data, py::return_value_policy::automatic);

  py::class_<MyClass<int>>(m, "MyClass")
      .def(py::init<>())
      .def(py::init<int>())
      .def_property(
          "data",
          &MyClass<int>::getData,
          &MyClass<int>::setData,
          py::return_value_policy::copy)
      .def_property(
          "data1",
          py::cpp_function(
              &MyClass<int>::getData,
              py::return_value_policy::copy),
          py::cpp_function(
              &MyClass<int>::setData));

  m.def_submodule("mod1", "mod1 doc")
      .def("print_dict", &print_dict)
      .def("generic", &generic)
      .def(
          "f", [](int a, int b) {}, py::arg("a"), py::kw_only(), py::arg("b"))
      .def(
          "floats_only", [](double f)
          { return .5 * f; },
          py::arg("f").noconvert())
      .def(
          "floats_preferred", [](double f)
          { return .5 * f; },
          py::arg("f"));

  py::class_<Dog>(m, "Dog").def(py::init<>());
  py::class_<Cat>(m, "Cat").def(py::init<>());
  m.def(
      "bark", [](Dog *dog) -> std::string
      {
        if (dog) return "woof!";
        else return "(no dog)"; },
      py::arg("dog").none(true));
  m.def(
      "meow", [](Cat *cat) -> std::string
      { return "meow"; },
      py::arg("cat").none(false));

  py::class_<ns1::Animal, ns1::PyAnimal>(m, "Animal")
      .def(py::init<>())
      .def("go", &ns1::Animal::go);
  py::class_<ns1::Dog, ns1::Animal, ns1::PyDog1<>>(m, "Dog1")
      .def(py::init<>())
      .def("name", &ns1::Dog::name);
  py::class_<ns1::Husky, ns1::Dog, ns1::PyDog1<ns1::PyHusky>>(m, "Husky")
      .def(py::init<>())
      .def("name", &ns1::Husky::name)
      .def("bark", &ns1::Husky::bark)
      .def("go", &ns1::Husky::go, py::arg("n_times") = 3);
  py::class_<ns1::PyAnimal1<ns1::Dog>>(m, "Animal2")
      .def(py::init<>());
  py::class_<ns1::PyDog1<ns1::Dog>, ns1::PyAnimal1<ns1::Dog>>(m, "Dog2")
      .def(py::init<>())
      .def("go", &ns1::PyDog1<ns1::Dog>::go)
      .def("bark", &ns1::PyDog1<ns1::Dog>::bark);
  m.def("call_go", &ns1::call_go);
}
