cmake_minimum_required(VERSION 3.15)
set(CMAKE_CXX_STANDARD 17)
project(example VERSION 0.0.0 LANGUAGES CXX)

add_definitions(-std=c++17)

add_subdirectory(pybind11)
# find_package(pybind11)
pybind11_add_module(example example.cpp)
target_compile_definitions(
  example
  PRIVATE
  VERSION_INFO=${EXAMPLE_VERSION_INFO}
)