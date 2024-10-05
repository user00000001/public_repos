# Sample 000

## build & make & make install

```shell
mkdir build; cd build; cmake -DCMAKE_BUILD_TYPE=Debug ..; cmake --build .

# cmake --build . --target install 
# CC=clang CXX=clang++ cmake ..
```

## in container

```shell
nerdctl build . -t test000
nerdctl run --rm -it test000
```
