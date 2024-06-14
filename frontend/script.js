const backendUrl = 'http://localhost:3000';

async function encryptText() {
    const text = document.getElementById('inputText').value;
    const algorithm = document.getElementById('algorithm').value;

    const response = await fetch(`${backendUrl}/encrypt`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, algorithm })
    });

    const data = await response.json();
    document.getElementById('outputText').value = data.encrypted;
}

async function decryptText() {
    const text = document.getElementById('outputText').value;
    const algorithm = document.getElementById('algorithm').value;

    const response = await fetch(`${backendUrl}/decrypt`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, algorithm })
    });

    const data = await response.json();
    document.getElementById('decryptedText').value = data.decrypted;
}
