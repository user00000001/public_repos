import time
import asyncio
from concurrent.futures import as_completed
from concurrent.futures import ThreadPoolExecutor
from anyio import (
    run,
    sleep,
    create_task_group,
    to_thread,
    from_thread,
    Event,
    TASK_STATUS_IGNORED,
    move_on_after,
)
from anyio.abc import TaskStatus

def blocking_function(secs: int):
    from_thread.run(sleep, secs) # blocked for async ops

def set_event(secs: int, event):
    from_thread.run(sleep, secs) # blocked
    # event.set() # not thread safe
    from_thread.run_sync(event.set) # blocked for sync ops

def run_in_portal(portal, secs):
    portal.call(sleep, secs)
    portal.call(portal.stop)

async def long_running_task(index):
    await sleep(1)
    print(f"Task {index} running...")
    await sleep(index)
    print(f"Task {index} return value")
    return index

def sync_function():
    try:
        while True:
            from_thread.check_cancelled()
            print('Not cancelled yet')
            time.sleep(1)
    except BaseException as e:
        print(f"break this sync function by: {e}")

async def main():
    to_thread.current_default_thread_limiter().total_tokens = 60
    print("Hello from anyio-03!")
    event = Event()
    async with create_task_group() as tg:
        start = time.time()
        tg.start_soon(sleep, 1)
        await to_thread.run_sync(time.sleep, 3, abandon_on_cancel=True)
        tg.start_soon(to_thread.run_sync, time.sleep, 3)
        end = time.time()
        print(f'await thread sleep {end-start} sec')
        await to_thread.run_sync(blocking_function, 3)
        end = time.time()
        print(f'await thread sleep {end-start} sec')
        tg.start_soon(to_thread.run_sync, set_event, 3, event)
        await event.wait()
        end = time.time()
        print(f'await thread sleep {end-start} sec')
    end = time.time()
    print(f'await thread sleep {end-start} sec')
    async with from_thread.BlockingPortal() as portal:
        await to_thread.run_sync(run_in_portal, portal, 5)
        await portal.sleep_until_stopped()
    with move_on_after(3):
        await to_thread.run_sync(sync_function)

async def service_task(*, task_status: TaskStatus[None] = TASK_STATUS_IGNORED):
    task_status.started("STARTED")
    await sleep(1)
    return "DONE"

class AsyncContextmanager:
    async def __aenter__(self):
        print("entering")
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        print('exiting with', exc_type, exc_val, exc_tb)

class MyAPI:
    def __init__(self, async_obj, do_async_stuff):
        self._async_obj = async_obj
        self._do_async_stuff = do_async_stuff
        self._portal_provider = from_thread.BlockingPortalProvider()
    def do_stuff(self, do_async_stuff_args):
        with self._portal_provider as portal:
            portal.call(getattr(self._async_obj, self._do_async_stuff), *do_async_stuff_args)
            print(do_async_stuff_args)

if __name__ == "__main__":
    run(main)
    print("block portal", time.ctime())
    with from_thread.start_blocking_portal() as portal, portal.wrap_async_context_manager(AsyncContextmanager()):
        portal.call(sleep, 3)
        futures = [portal.start_task_soon(long_running_task, i) for i in range(1, 5)]
        results = list(map(lambda f: f.cancel(), futures))
        print(results)
        for future in as_completed(filter(lambda f: not f.cancelled, futures)):
            print(future.result())
        future, start_value = portal.start_task(service_task)
        print('Task has started with value', start_value)
        print('Task has finished with return value', future.result())
    print(time.ctime())
    myapi = MyAPI(asyncio, 'sleep')
    with ThreadPoolExecutor(max_workers=5) as pool:
        pool.map(myapi.do_stuff, ((i, ) for i in range(5)))
