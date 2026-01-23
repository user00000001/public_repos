from anyio import (
    run,
    sleep,
    create_task_group,
    Event,
    Semaphore,
    Lock,
    Condition,
    CapacityLimiter,
    ResourceGuard,
    BusyResourceError,
)

async def notify(event):
    event.set()

async def use_resource(type_name, tasknum, guard):
    async with guard:
        print(type_name, "task", tasknum, "is using")
        await sleep(1)

async def listen(tasknum, condition):
    async with condition:
        await condition.wait() # this will release lock, then replaced by event
        print("wake up task", tasknum)

class Resource:
    def __init__(self):
        self._guard = ResourceGuard()
    async def limit_operation(self):
        with self._guard:
            await sleep(5)

async def main():
    print("Hello from anyio-01!")
    event = Event()
    semaphore = Semaphore(2)
    lock = Lock()
    condition = Condition()
    limiter = CapacityLimiter(2)

    async with create_task_group() as tg:
        tg.start_soon(notify, event)
        await event.wait()
        print("Get Notification.")
        for num in range(10):
            tg.start_soon(use_resource, "semaphore", num, semaphore)
        for num in range(5):
            tg.start_soon(use_resource, "lock", num, lock)
        for num in range(5):
            tg.start_soon(use_resource, "capcity limiter", num, limiter)

    async with create_task_group() as tg:
        for tasknum in range(6):
            tg.start_soon(listen, tasknum, condition)

        await sleep(1)
        async with condition:
            condition.notify(1)
        await sleep(1)
        async with condition:
            condition.notify(2)
        await sleep(1)
        async with condition:
            condition.notify_all()

    resource = Resource()
    try:
        async with create_task_group() as tg:
            for i in range(3):
                tg.start_soon(resource.limit_operation)
    except* BusyResourceError as excgroup:
        for exc in excgroup.exceptions:
            print("exc", exc)


if __name__ == "__main__":

    run(main)
