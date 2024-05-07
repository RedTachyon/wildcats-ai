# import asyncio
# import websockets
#
# async def handle_connection(websocket: websockets.WebSocketServerProtocol, path: str):
#     async for message in websocket:
#         await websocket.send("window.scrollBy(0, 100);")
#
#
# start_server = websockets.serve(handle_connection, "localhost", 8765)
#
# asyncio.get_event_loop().run_until_complete(start_server)
# asyncio.get_event_loop().run_forever()
