from fastmcp import FastMCP

mcp = FastMCP("fastmcp-00")


@mcp.tool
def add(a: int, b: int) -> int:
    """
    add two int number.
    """
    return a + b


if __name__ == "__main__":
    mcp.run()
