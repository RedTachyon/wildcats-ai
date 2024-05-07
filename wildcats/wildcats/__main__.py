import asyncio
import websockets

async def handle_connection(websocket: websockets.WebSocketServerProtocol, path: str):
    async for message in websocket:
        print(f"Received message: {message}")
        await websocket.send("window.scrollBy(0, 100);")

async def main():
    server = await websockets.serve(handle_connection, "localhost", 8765)
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())
