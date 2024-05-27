import asyncio
import websockets
import pyautogui

is_running = False

async def handle_connection(websocket: websockets.WebSocketServerProtocol, path: str):
    async for message in websocket:
        print(f"Received message: {message}")
        if message == "control_browser":
            print(f"Pressing esc")
            pyautogui.press('esc')
            print(f"Pressing down 3 times")
            pyautogui.press('down', presses=10)
        await websocket.send("Commands executed")

def process_message(message: str):
    global is_running
    if is_running:
        return
    is_running = True

    task = message





async def main():
    print("Starting server")
    server = await websockets.serve(handle_connection, "localhost", 8765)
    print("Listening")
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())
