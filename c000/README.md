# Sample c000

## build & make & make install

```shell
mkdir build; cd build; cmake -DCMAKE_BUILD_TYPE=Debug ..; cmake --build .

# cmake --build . --target install 
# CC=clang CXX=clang++ cmake ..
```

## in container

```shell
nerdctl build . -t testc000
nerdctl run --rm -it testc000
```
