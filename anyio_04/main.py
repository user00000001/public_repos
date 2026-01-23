import os
import time
import signal

from anyio import (
    run,
    sleep,
    run_process,
    open_process,
    to_process,
    to_interpreter,
    open_file,
    wrap_file,
    Path,
    TemporaryFile,
    NamedTemporaryFile,
    SpooledTemporaryFile,
    TemporaryDirectory,
    mkdtemp,
    mkstemp,
    gettempdir,
    open_signal_receiver,
    CancelScope,
    create_task_group,
)
from anyio.streams.text import TextReceiveStream

def cpu_intensive_function(arg1, arg2):
    time.sleep(1)
    print("Not Printed in to_process!") # std in/out/err to /dev/null
    return arg1 + arg2

async def signal_handler(scope: CancelScope):
    with open_signal_receiver(signal.SIGINT, signal.SIGTERM) as signals:
        async for signum in signals:
            if signum == signal.SIGINT:
                print('Ctrl+C pressed')
            else:
                print("Terminated!")
            scope.cancel()
            return

async def main():
    print("Hello from anyio-04!")
    result = await run_process(['ps'])
    # result = await run_process('ps', shell=False)
    print(result.stdout.decode())
    async with await open_process(['ps']) as process:
        async for text in TextReceiveStream(process.stdout):
            print(text)
    process = to_process.run_sync(cpu_intensive_function, "Hello, ", "World!", cancellable=True)
    # process.close()
    result = await process
    print(result)
    interpreter = to_interpreter.run_sync(cpu_intensive_function, "Hello, ", "World!")
    # interpreter.close()
    result = await interpreter
    print(result)
    async with await open_file('.python-version') as f:
        contents = await f.read()
        print(contents, end="")
        await f.seek(0)
        async for line in f:
            print(line, end="")

    with open('.python-version') as f:
        async for line in wrap_file(f):
            print(line, end="")

    dir_path = Path(".")
    async for path in dir_path.iterdir():
        if await path.is_file():
            print(await path.read_text())
            print("---------------------")
    # async with TemporaryFile(mode="w+") as f:
    async with NamedTemporaryFile(mode="w+") as f:
    # async with SpooledTemporaryFile(max_size=1024, mode="w+") as f:
        await f.write("Temporary file content")
        await f.seek(0)
        print(f.name if hasattr(f, 'name') else None, "\n", await f.read())
    async with TemporaryDirectory() as temp_dir:
        print(temp_dir, type(temp_dir))

    fd, path = await mkstemp(suffix=".txt", prefix="mkstemp_", text=True)
    print(f"Created temp file: {path}")

    temp_dir = await mkdtemp(prefix="mkdtemp_")
    print(f"Created temp dir: {temp_dir}")

    print(f"Default temp dir: {await gettempdir()}")
    os.remove(path=path)
    os.removedirs(temp_dir)
    print(os.getpid())
    interrupted_times = 5
    with open_signal_receiver(signal.SIGTERM, signal.SIGHUP, signal.SIGINT) as signals:
        async for signum in signals:
            if signum == signal.SIGTERM:
                break
            elif signum == signal.SIGHUP:
                print("Reloading configuration")
            
            elif signum == signal.SIGINT:
                if interrupted_times > 0:
                    print("Interrupted")
                    interrupted_times -= 1
                else:
                    break
    async with create_task_group() as tg:
        tg.start_soon(signal_handler, tg.cancel_scope)
        # await sleep(10)

if __name__ == "__main__":
    run(main)
