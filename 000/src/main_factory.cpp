#include "include/Product.hpp"
#include "include/Factory.hpp"

int main(int argc, char const *argv[])
{
    Factory * fac = new ConcreteFactory();
    Product * p = fac->CreateProduct();
    return 0;
}
