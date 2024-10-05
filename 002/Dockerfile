FROM ubuntu:22.04
COPY . /src

RUN sed -i 's#http://archive.ubuntu.com#http://mirrors.tuna.tsinghua.edu.cn#g' /etc/apt/sources.list

RUN apt update && \
    apt install build-essential cmake -y && \
    mkdir -p /src/build && \
    cd /src/build && \
    cmake .. && \
    cmake --build .

FROM ubuntu:22.04
COPY --from=0 /src/build/bin/000 .

ENTRYPOINT [ "/bin/bash", "-c" ]

CMD [ "/000" ]