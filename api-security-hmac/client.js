const crypto = require('crypto');
const axios = require('axios');

// Secret Key yang sama
const secretKey = 'mySecretKey';
// Nonce tetap sama untuk pengujian replay attack
const nonce = 'fixed_nonce_valu';  // Ganti dengan nilai tetap
const timestamp = Date.now();
const message = 'GET /data';

// Rekonstruksi pesan untuk HMAC
const reconstructedMessage = `${message}${nonce}${timestamp}`;
const hmac = crypto.createHmac('sha256', secretKey).update(reconstructedMessage).digest('hex');

// Fungsi untuk mengirim permintaan API
axios.post('http://localhost:3000/data', { // Ubah ke port 4000 untuk MITM Proxy
    message,
    nonce,
    timestamp,
    hmac
})
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error('Error:', error.response ? error.response.data : error.message);
});

