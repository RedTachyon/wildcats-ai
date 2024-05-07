document.getElementById('send')!.addEventListener('click', async () => {
    const commandInput = document.getElementById('command') as HTMLInputElement;
    const command = commandInput.value;
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: sendCommand,
        args: [command]
    });
});

async function sendCommand(command: string): Promise<void> {
    const socket = new WebSocket('ws://localhost:8765');
    socket.onopen = () => {
        socket.send(command);
    };
    socket.onmessage = (event) => {
        eval(event.data);
    };
    socket.onclose = () => {
        console.log('Connection closed');
    };
}
