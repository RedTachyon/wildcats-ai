import asyncio
import websockets

async def send_message():
    uri = "ws://localhost:8765"
    async with websockets.connect(uri) as websocket:
        await websocket.send("Test message")
        response = await websocket.recv()
        print("Received from server:", response)

if __name__ == "__main__":
    asyncio.run(send_message())
