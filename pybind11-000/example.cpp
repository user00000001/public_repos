#include <pybind11/pybind11.h>
#include <iostream>

namespace py = pybind11;

int add(int i, int j) {
  return i + j;
}

int add_1(int i=1, int j=2) {
  return i + j;
}

struct Pet {
  Pet(const std::string & name): name(name){}
  void setName(const std::string &name) {this->name = name;}
  const std::string &getName() const {return name;}
  std::string name;
  static void print_static(std::string & str) {
    std::cout << str << std::endl;
  }
};


namespace ns1 {
  template <typename T>
  class Pet1 {
    private:
    std::string name;
    public:
    Pet1(const std::string &name): name(name) {}
    void setName(const std::string &name){this->name = name;}
    const std::string & getName() const {return name;}
    static void setSName(const std::string & sname) {
      Pet1::sname = sname;
    }
    static std::string sname;
    T value;
  };
  
  template<typename T> 
  std::string Pet1<T>::sname = "this is a static attribute.";
}

namespace ns2 {
  struct Pet {
    Pet(const std::string & name): name(name) {}
    std::string name;
  };
  struct Dog: Pet {
    Dog(const std::string & name): Pet(name) {}
    std::string bark() const { return "woof!"; }
  };

  struct PolymorphicPet {
    virtual ~PolymorphicPet() = default;
  };
  struct PolymorphicDog: PolymorphicPet {
    std::string bark() const { return "woof!"; }
  };
}

namespace ns3 {
  struct Pet {
    Pet(const std::string & name, int age): name(name), age(age) {}
    void set(int age) { this->age = age; }
    void set(const std::string & name) { this->name = name; }
    std::string name;
    int age;
  };
  // struct Widget {
  //   int foo(int x, float y);
  //   int foo(int x, float y) const;
  // };
}

namespace ns4 {
  struct Pet {
    enum Kind {
      Dog = 0,
      Cat
    };
    struct Attribute {
      float age = 0;
    };
    Pet(const std::string &name, Kind type): name(name), type(type) {}
    std::string name;
    Kind type;
    Attribute attr;
  };
}

// -std=c++11
template <typename... Args>
using overload_cast_ = pybind11::detail::overload_cast_impl<Args...>;

PYBIND11_MODULE(example, m) {
  m.doc() = "pybind11 example plugin";
  m.def("add", &add, "A function that adds two numbers");

  m.def("add1", &add, "A function which adds two numbers", py::arg("i"), py::arg("j"));
  using namespace py::literals;
  m.def("add2", &add, "i"_a, "j"_a);

  m.def("add_1", &add, "A function which adds two numbers", py::arg("i")=1, py::arg("j")=2);
  m.def("add_1_1", &add, "i"_a = 1, "j"_a = 2);

  m.attr("the_answer") = 42;
  py::object world = py::cast("world");
  m.attr("what") = world;

  py::class_<Pet>(m, "Pet")
    .def(py::init<const std::string &>())
    .def("setName", &Pet::setName)
    .def("getName", &Pet::getName)
    .def_static("print_static", &Pet::print_static, "s"_a)
    .def("__repr__", [](const Pet&a){
      return "<example.Pet named '" + a.name + "'>";
    })
    .def_readwrite("name", &Pet::name);

  py::class_<ns1::Pet1<int>>(m, "Pet_1", py::dynamic_attr())
    .def_property("name", &ns1::Pet1<int>::getName, &ns1::Pet1<int>::setName)
    .def_static("setSName", &ns1::Pet1<int>::setSName, py::arg("s"))
    .def_readwrite_static("sname", &ns1::Pet1<int>::sname);

  using ns2::Pet;
  using ns2::Dog;
  py::class_<Pet>(m, "Pet_2")
    .def(py::init<const std::string &>())
    .def_readwrite("name", &Pet::name);
  py::class_<Dog, Pet>(m, "Dog")
    .def(py::init<const std::string &>())
    .def("bark", &Dog::bark);
  
  // py::class_<Pet> pet(m, "Pet_2");
  // pet.def(py::init<const std::string &>())
  //   .def_readwrite("name", &Pet::name);
  // py::class_<Dog>(m, "Dog", pet)
  //   .def(py::init<const std::string &>())
  //   .def("bark", &Dog::bark);
  py::class_<ns2::PolymorphicPet>(m, "PolymorphicPet");
  py::class_<ns2::PolymorphicDog, ns2::PolymorphicPet>(m, "PolymorphicDog")
    .def(py::init<>())
    .def("bark", &ns2::PolymorphicDog::bark);
  m.def("pet_store2", [](){
    return std::unique_ptr<ns2::PolymorphicPet>(new ns2::PolymorphicDog);
  });

  py::class_<ns3::Pet> pet (m, "Pet_3");
  pet.def(py::init<const std::string &, int>());

  pet.def("set", static_cast<void (ns3::Pet::*)(int)>(&ns3::Pet::set), "Set the pet's age");
  pet.def("set", static_cast<void (ns3::Pet::*)(const std::string &)>(&ns3::Pet::set), "Set the pet's name");

  // -std=c++11
  pet.def("set", overload_cast_<int>()(&ns3::Pet::set), "Set the pet's age");
  pet.def("set", overload_cast_<const std::string &>()(&ns3::Pet::set), "Set the pet's name");

  pet.def_readonly("name", &ns3::Pet::name);
  pet.def_readonly("age", &ns3::Pet::age);

  // -std=c++14
  // pet.def("set", py::overload_cast<int>(&ns3::Pet::set), "Set the pet's age");
  // pet.def("set", py::overload_cast<const std::string &>(&ns3::Pet::set), "Set the pet's name");
  // py::class_<ns3::Widget>(m, "Widget")
  //   .def("foo_mutable", py::overload_cast<int, float>(&ns3::Widget::foo))
  //   .def("foo_const", py::overload_cast<int, float>(&ns3::Widget::foo, py::const_));

  py::class_<ns4::Pet> pet1 (m, "Pet_4");
  pet1.def(py::init<const std::string &, ns4::Pet::Kind>())
    .def_readwrite("name", &ns4::Pet::name)
    .def_readwrite("type", &ns4::Pet::type)
    .def_readwrite("attr", &ns4::Pet::attr);
  py::enum_<ns4::Pet::Kind>(pet1, "Kind")
    .value("Dog", ns4::Pet::Kind::Dog)
    .value("Cat", ns4::Pet::Kind::Cat)
    .export_values();
  py::class_<ns4::Pet::Attribute>(pet1, "Attribute")
    .def(py::init<>())
    .def_readwrite("age", &ns4::Pet::Attribute::age);
}
