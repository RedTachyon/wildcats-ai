document.getElementById('send')!.addEventListener('click', async () => {
    const commandInput = document.getElementById('command') as HTMLInputElement;
    const command = commandInput.value;
    let tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs.length === 0 || tabs[0].id === undefined) {
        console.error("No active tab or tab ID is undefined");
        return;
    }
    const tabId = tabs[0].id;  // Safe to use as we have checked it's defined.

    // Define the function you want to inject and execute.
    function executeScript(command: string) {
        console.log("!!!! I am here !!!!")

        // function getAccessibilityTree(callback: (response: any) => void) {
        //     chrome.debugger.attach({tabId: chrome.devtools.inspectedWindow.tabId}, "1.3", function() {
        //         chrome.debugger.sendCommand({tabId: chrome.devtools.inspectedWindow.tabId}, 'Accessibility.getFullAXTree', {}, function(response) {
        //             chrome.debugger.detach({tabId: chrome.devtools.inspectedWindow.tabId});
        //             callback(response);
        //         });
        //     });
        // }
        //
        // getAccessibilityTree(function(response) {
        //     console.log(response);
        // });


        // chrome.runtime.sendMessage({action: "getAccessibilityTree"}, function(response) {
        //     console.log('Accessibility Tree:', response.axTree);
        // });



        const socket = new WebSocket('ws://localhost:8765');
        socket.onopen = () => {
            socket.send(command);
        };
        socket.onmessage = (event) => {
            console.log('Message from server:', event.data);
        };
        socket.onclose = () => {
            console.log('Connection closed');
        };
    }

    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: executeScript,
        args: [command]
    });





});
