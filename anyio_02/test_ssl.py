import ssl
import pytest 
import trustme
import random

from anyio import (
    move_on_after,
    create_task_group,
    connect_tcp,
    create_tcp_listener,
    TASK_STATUS_IGNORED,
)
from anyio.streams.tls import TLSListener
from anyio.abc import TaskStatus

# pytestmark = pytest.mark.anyio

@pytest.fixture(scope='session')
def ca():
    return trustme.CA()

@pytest.fixture(scope='session')
def server_context(ca):
    context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
    ca.issue_cert('localhost').configure_cert(context)
    return context

@pytest.fixture(scope='session')
def client_context(ca):
    context = ssl.create_default_context(ssl.Purpose.SERVER_AUTH)
    ca.configure_trust(context)
    return context

async def handle(client):
    async with client:
        data = await client.receive()
        await client.send(f"received {data.decode()}".encode())

async def run_tls_server(port, context, *, task_status: TaskStatus[None]=TASK_STATUS_IGNORED):
    server = TLSListener(await create_tcp_listener(local_port=port), ssl_context=context)
    task_status.started()
    await server.serve(handler=handle)

@pytest.mark.usefixtures('anyio_backend')
@pytest.mark.parametrize('anyio_backend', ['asyncio', 'trio'])
async def test_tls(client_context, server_context):
    async with create_task_group() as tg:
        port = random.randint(15000, 20000)
        await tg.start(run_tls_server, port, server_context)
        async with await connect_tcp("localhost", port, ssl_context=client_context, tls_standard_compatible=True) as client:
            await client.send(b"secert")
            received_data = await client.receive()
            tg.cancel_scope.cancel()
            assert received_data == b'received secert'