const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { encryptAES, decryptAES, encryptDES, decryptDES, generateRSAKeys, encryptRSA, decryptRSA } = require('./encrypt');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Serve static files from the 'frontend' directory
app.use(express.static('frontend'));

// RSA keys
const { publicKey, privateKey } = generateRSAKeys();

// AES and DES keys
const aesKey = crypto.randomBytes(32);
const desKey = crypto.randomBytes(8);

// Route to handle GET requests to the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html');
});

// Route to handle encryption requests
app.post('/encrypt', (req, res) => {
    const { text, algorithm } = req.body;
    let encrypted;

    switch (algorithm) {
        case 'aes':
            encrypted = encryptAES(text, aesKey);
            break;
        case 'des':
            encrypted = encryptDES(text, desKey);
            break;
        case 'rsa':
            encrypted = encryptRSA(text, publicKey);
            break;
        default:
            return res.status(400).send('Invalid algorithm chosen.');
    }

    res.json({ encrypted });
});

// Route to handle decryption requests
app.post('/decrypt', (req, res) => {
    const { text, algorithm } = req.body;
    let decrypted;

    switch (algorithm) {
        case 'aes':
            decrypted = decryptAES(text, aesKey);
            break;
        case 'des':
            decrypted = decryptDES(text, desKey);
            break;
        case 'rsa':
            decrypted = decryptRSA(text, privateKey);
            break;
        default:
            return res.status(400).send('Invalid algorithm chosen.');
    }

    res.json({ decrypted });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
