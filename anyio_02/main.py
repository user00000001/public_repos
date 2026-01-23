import os
import ssl
import socket
from pathlib import Path
from anyio import (
    run,
    sleep,
    create_task_group,
    create_memory_object_stream,
    create_tcp_listener,
    connect_tcp,
    TASK_STATUS_IGNORED,
    create_unix_listener,
    connect_unix,
    create_udp_socket,
    create_connected_udp_socket,
    create_unix_datagram_socket,
    create_connected_unix_datagram_socket,
)
from anyio.streams.memory import MemoryObjectReceiveStream
from anyio.streams.buffered import BufferedByteReceiveStream
from anyio.streams.text import TextReceiveStream, TextSendStream
from anyio.streams.stapled import StapledObjectStream
from anyio.streams.file import FileReadStream, FileWriteStream
from anyio.streams.tls import TLSListener
from anyio.abc import TaskStatus

path = Path('/tmp/test_send_fds')
path.write_text("Test file")

async def process_items(receive_stream: MemoryObjectReceiveStream[str], work_id: str) -> None:
    async with receive_stream.clone() as receive_stream_clone:
        async for item in receive_stream_clone:
            print(work_id, "received", item)

class Object:
    def __init__(self, name: str):
        self.name = name

async def handle(client):
    async with client:
        name = await client.receive()
        await client.send(f'Hello, {name.decode()}\n'.encode())

async def send_fds(client):
    async with client:
        with path.open('r') as file:
            await client.send_fds(b'this message is ignored!', [file])

async def ssl_server(*, task_status: TaskStatus[None] = TASK_STATUS_IGNORED):
    conext = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
    conext.load_cert_chain(certfile="selfsign.pem", keyfile='selfsign-key.pem')
    listener = TLSListener(await create_tcp_listener(local_port=12345), ssl_context=conext)
    task_status.started()
    await listener.serve(handler=handle)

async def unix_server(path: str, *, task_status: TaskStatus[None] = TASK_STATUS_IGNORED):
    listener = await create_unix_listener(path)
    task_status.started()
    await listener.serve(handler=handle)

async def unix_fds(path: str, *, task_status: TaskStatus[None] = TASK_STATUS_IGNORED):
    listener = await create_unix_listener(path)
    task_status.started()
    await listener.serve(handler=send_fds)

async def udp_server(port, *, task_status: TaskStatus[None] = TASK_STATUS_IGNORED):
    async with await create_udp_socket(
        family=socket.AF_INET6, # others hosts in the lan, but random port
        # family=socket.AF_INET, # others hosts in the lan, but random port
        # local_host="127.0.0.1", # ipv4
        # local_host="::1", # ipv6
        # local_host="localhost", # ipv6
        # local_port=port # example not working with family option.
    ) as udp:
        task_status.started(udp._raw_socket.getsockname())
        async for packet, (host, port) in udp:
            print(host, port, packet)
            await udp.sendto(b'Hello, ' + packet, host, port)

async def udp_unix_server(path, *, task_status: TaskStatus[None] = TASK_STATUS_IGNORED):
    async with await create_unix_datagram_socket(
        local_path=path,
    ) as unix_dg:
        task_status.started()
        async for packet, path in unix_dg:
            print(packet, path)
            await unix_dg.sendto(b'Hello, ' + packet, path)

async def main():
    print("Hello from anyio-02!")
    send_stream, receive_stream = create_memory_object_stream[str]()
    async with create_task_group() as tg:
        tg.start_soon(process_items, receive_stream, "work-0")
        tg.start_soon(process_items, receive_stream, "work-1")
        async with send_stream:
            for num in range(10):
                send_stream_clone = send_stream.clone()
                async with send_stream_clone:
                    await send_stream_clone.send(f'number {num}')
                # with send_stream_clone:
                    # send_stream_clone.send_nowait(f'number {num}')
    with receive_stream:
        # receive_stream.receive_nowait()
        print("done")
    send, receive = create_memory_object_stream[str](max_buffer_size=1000)
    buffered = BufferedByteReceiveStream(receive_stream=receive)
    for part in b'hel', b'lo, ', b'wo', b'rld!':
        await send.send(part)
    result = await buffered.receive_exactly(8)
    print(repr(result))
    result = await buffered.receive_until(b'!', 10)
    print(repr(result))

    a = Object('A')
    b = Object('B')
    send, receive = create_memory_object_stream[Object](max_buffer_size=1000)
    stapled_stream = StapledObjectStream(send_stream=send, receive_stream=receive)
    await stapled_stream.send(a)
    await stapled_stream.send(b)
    await stapled_stream.send_eof()
    async with stapled_stream:
        async for obj in stapled_stream:
            print('received object: ', obj.name)

    bytes_send, bytes_receive = create_memory_object_stream[bytes](max_buffer_size=1000)
    text_send = TextSendStream(bytes_send)
    await text_send.send("大家好！")
    result = await bytes_receive.receive()
    print(repr(result))

    text_receive = TextReceiveStream(bytes_receive)
    await bytes_send.send(result)
    result = await text_receive.receive()
    print(repr(result))

    path = '/tmp/testfile'
    async with await FileWriteStream.from_path(path=path) as stream:
        await stream.send(b'Hello, World!')

    async with await FileReadStream.from_path(path=path) as stream:
        async for chunk in stream:
            print(chunk.decode(), end='')
        print()

    async with create_task_group() as tg:
        await tg.start(ssl_server)
        context = ssl.create_default_context(ssl.Purpose.SERVER_AUTH)
        context.load_verify_locations(cafile='selfsign.pem')
        async with await connect_tcp('127.0.0.1', 12345, ssl_context=context) as client:
            await client.send(b'Client\n')
            response = await client.receive()
            print(response)
            tg.cancel_scope.cancel()
    async with create_task_group() as tg:
        path = Path("/tmp/test_unix")
        await tg.start(unix_server, path)
        async with await connect_unix(path) as client:
            await client.send(b'world!')
            data = await client.receive()
            print(data.decode())
            tg.cancel_scope.cancel()
    async with create_task_group() as tg:
        path = Path("/tmp/test_unix")
        await tg.start(unix_fds, path)
        async with await connect_unix(path) as client:
            msg, fds = await client.receive_fds(100, 1)
            print(msg.decode())
            with os.fdopen(fds[0]) as file:
                print(file.read())
            tg.cancel_scope.cancel()
    async with create_task_group() as tg:
        udp_socket_name = await tg.start(udp_server, 12345)
        print(udp_socket_name)
        async with await create_connected_udp_socket(
            # remote_host="127.0.0.1", 
            # remote_host="::1", 
            remote_host="localhost", # ipv6
            remote_port=udp_socket_name[1]
        ) as udp:
            await udp.send(b'Hi there!\n')
            data = await udp.receive()
            print(data.decode())
            tg.cancel_scope.cancel()

    async with create_task_group() as tg:
        path = Path('/tmp/test_unix')
        path1 = Path('/tmp/test_unix_local')
        await tg.start(udp_unix_server, path)
        async with await create_connected_unix_datagram_socket(
            remote_path=path,
            local_path=path1,
        ) as unix_dg:
            await unix_dg.send(b'Hi There 1!\n')
            data = await unix_dg.receive()
            print(data.decode())
            tg.cancel_scope.cancel()
    

if __name__ == "__main__":
    run(main)
