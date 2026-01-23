import asyncio

from anyio import (
    run, 
    sleep, 
    create_task_group, 
    TASK_STATUS_IGNORED, 
    move_on_after, 
    fail_after,
    CancelScope,
    connect_tcp,
    create_tcp_listener,
    get_cancelled_exc_class,
)
from anyio.abc import TaskStatus
from asyncio import Runner
from uvloop import new_event_loop
from exceptiongroup import catch
from contextvars import ContextVar

var = ContextVar('var', default='default')

async def sometask(num: int) -> None:
    print('Task', num, 'running', var.get())
    await sleep(1)
    print('Task', num, 'finished')

async def sometask_must_be_done(secs: float, *, task_status: TaskStatus[None] = TASK_STATUS_IGNORED):
    var.set("A")
    await sleep(secs)
    task_status.started()

def handle_timeout_error_group(excgroup):
    for exc in excgroup.exceptions:
        print(f"Exception: {exc}")

async def handler(stream):
    async for msg in stream:
        print("handling: ", msg)
        await stream.send(f"handled: {msg}.".encode())

async def start_some_service(port: int, *, task_status: TaskStatus[None] = TASK_STATUS_IGNORED):
    async with await create_tcp_listener(
        local_host="127.0.0.1",
        local_port=port,
    ) as listener:
        task_status.started()
        await listener.serve(handler=handler)

async def external_task():
    print("Started sleeping in the external task")
    await sleep(1)
    print("This line should never be seen")

async def some_exception(*, task_status: TaskStatus[None] = TASK_STATUS_IGNORED):
    try:
        task_status.started()
        raise asyncio.CancelledError("self throw")   
    except get_cancelled_exc_class():
        with CancelScope(shield=True): # still under cancel state, shield coroutine in the scope from cancel state
            await sleep(3)
            print("exception sleeping done.")
        raise

async def main():
    print("Hello from anyio-00!")
    # try:
    with catch({
        ValueError: lambda excgroup: excgroup,
        KeyError: lambda excgroup: excgroup,
        TimeoutError: handle_timeout_error_group
    }):
        var.set('B')
        async with create_task_group() as tg:
            sleep_secs = 3
            print(f"waiting for {sleep_secs} secs")
            with move_on_after(1) as scope:
                await tg.start(sometask_must_be_done, sleep_secs)
                print("Never Print.")
            print(f"Exited cancel scope, cancelled =", scope.cancelled_caught)
            # with fail_after(1) as scope:
            #     await tg.start(sometask_must_be_done, sleep_secs)
            print('starting tasks.')
            for num in range(5):
                tg.start_soon(sometask, num)
            await tg.start(start_some_service, 5000)
            with move_on_after(3) as scope:
                async with await connect_tcp("127.0.0.1", 5000) as stream:
                    await stream.send(b"Hello World!")
                    resp = await stream.receive()
                    print(f"response: {resp.decode()}")
                    tg.cancel_scope.cancel()
                    # await stream.receive()
                    # raise TimeoutError("Terminate server.")
            print(f"Exited cancel scope, cancelled =", scope.cancelled_caught)
            tg.cancel_scope.cancel()
        async with create_task_group() as tg:
            with CancelScope(shield=True) as scope:
                tg.start_soon(external_task) # this task is cancelled.
                tg.cancel_scope.cancel()
                print("Started sleeping in the host task")
                await sleep(1) # still works under shield=true.
                print("Finished sleeping in the host task")

            await tg.start(some_exception) # canceled

        async with create_task_group() as tg:
            await tg.start(some_exception)
    # except* ValueError as excgroup:
    #     for exc in excgroup.exceptions:
    #         pass
    # except* KeyError as excgroup:
    #     for exc in excgroup.exceptions:
    #         pass

    print("All tasks finished!")

if __name__ == "__main__":
    # run(main, backend='trio')
    run(main, backend='asyncio', backend_options={
        # 'use_uvloop': True,
        'loop_factory': new_event_loop
    })
    # runner = Runner(
    #     debug=True, 
    #     loop_factory=new_event_loop,
    # )
    # with runner:
    #     runner.run(main())
