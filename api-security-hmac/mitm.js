const http = require('http');
const axios = require('axios');

const mitmPort = 4000;
const serverUrl = 'http://localhost:3000/data';

// Create MITM Proxy Server
const mitmServer = http.createServer((req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        // Parsing the original request
        const originalRequest = JSON.parse(body);
        console.log('Original Request:', originalRequest);

        // Modify the message (e.g., change "message")
        const modifiedRequest = {
            ...originalRequest,
            message: 'GET /modified-data', // The modified message
            // Note: HMAC remains the same because MITM doesn't know the secret key
        };

        console.log('Modified Request:', modifiedRequest);

        // Forward the modified request to the server
        axios.post(serverUrl, modifiedRequest)
            .then(serverResponse => {
                res.writeHead(serverResponse.status, serverResponse.headers);
                res.end(serverResponse.data);
            })
            .catch(error => {
                res.writeHead(error.response.status, error.response.headers);
                res.end(error.response.data);
            });
    });
});

// Run the MITM Proxy on port 4000
mitmServer.listen(mitmPort, () => {
    console.log(`MITM Proxy running on http://localhost:${mitmPort}`);
});
