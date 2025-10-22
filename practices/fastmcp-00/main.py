import json
import asyncio
from typing import Any, List
from fastmcp import Client
from openai import OpenAI
from openai.types.chat import (
    ChatCompletionMessageFunctionToolCall,
)

from mcp_server import mcp

mcp_config = {
    "mcpServers": {"mcpServer": {"command": "python", "args": ["./mcp_server.py"]}}
}


class UserClient:
    tools: List[Any]
    messages: List[Any]
    mcp_client: Client
    llm: OpenAI

    def __init__(self, client: Client) -> None:
        self.llm = OpenAI(
            base_url="http://127.0.0.1:11434/v1",
            api_key="",
        )
        self.mcp_client = client
        self.messages = [
            {"role": "system", "content": "you must use tool to get the answer."}
        ]

    async def prepare_tools(self) -> None:
        self.tools = [
            {
                "type": "funciton",
                "function": {
                    "name": tool.name,
                    "description": tool.description,
                    "parameters": tool.inputSchema,
                },
            }
            for tool in await self.mcp_client.list_tools()
        ]
        print(self.mcp_client.list_tools())

    async def loop(self):
        while True:
            msg = input("User Input:")
            message = {"role": "user", "content": msg}
            self.messages.append(message)
            resp = await self.chat(self.messages)
            self.messages.append({"role": "assistant", "content": resp.content})
            print("LLM Response:", self.messages[-1]["content"])

    async def chat(self, msgs: Any, use_tools: bool = True) -> Any:
        response = self.llm.chat.completions.create(
            model="qwen3:8b",
            tools=self.tools if use_tools else [],
            messages=msgs,
            extra_body={"enable_thinking": False},
            tool_choice="auto",
        )
        print(response.choices)
        if response.choices[0].finish_reason != "tool_calls":
            return response.choices[0].message
        for tool_call in response.choices[0].message.tool_calls or []:
            if isinstance(tool_call, ChatCompletionMessageFunctionToolCall):
                result = await self.mcp_client.call_tool(
                    tool_call.function.name, json.loads(tool_call.function.arguments)
                )
                print(result)
                self.messages.append(
                    {
                        "rule": "assistant",
                        "content": response.choices[0].message.content,
                    }
                )
                self.messages.append(
                    {
                        "rule": "tool",
                        "name": tool_call.function.name,
                        "content": f"tool call to add is finished, the answer is {result.data}",
                        "tool_call_id": tool_call.id,
                    }
                )
                return await self.chat(self.messages, True)


async def main():
    print("Hello from fastmcp-00!")
    async with Client(
        mcp or mcp_config or "mcp_server.py" or "http://127.0.0.1:8000/sse"
    ) as client:
        tools_list = await client.list_tools()
        print(f"tools_list: \n{tools_list}")
        a = 10
        b = 100
        result = await client.call_tool("add", {"a": a, "b": b})
        print(f"result of {a} + {b} = {result.data}")
        uc = UserClient(client)
        await uc.prepare_tools()
        print(uc.tools)
        await uc.loop()


if __name__ == "__main__":
    asyncio.run(main())
