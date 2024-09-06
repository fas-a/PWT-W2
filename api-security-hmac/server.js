const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 3000;

// Secret Key yang akan digunakan untuk HMAC
const secretKey = 'mySecretKey';

// Middleware untuk mem-parsing JSON
app.use(express.json());

// Middleware untuk menyimpan nonce yang sudah digunakan
app.locals.nonceStore = new Set();

// Middleware untuk verifikasi HMAC dan deteksi Replay Attack
app.use((req, res, next) => {
    const { message, nonce, timestamp, hmac } = req.body;

    // Cek jika timestamp sudah kadaluarsa (5 menit)
    const now = Date.now();
    if (now - timestamp > 5 * 60 * 1000) { // 5 menit
        return res.status(400).send('Request expired');
    }

    // Rekonstruksi pesan untuk validasi HMAC
    const reconstructedMessage = `${message}${nonce}${timestamp}`;
    const calculatedHmac = crypto.createHmac('sha256', secretKey).update(reconstructedMessage).digest('hex');

    // Validasi HMAC
    if (calculatedHmac !== hmac) {
        return res.status(403).send('HMAC validation failed, possible tampering detected');
    }

    // Deteksi Replay Attack: Cek apakah nonce sudah digunakan
    if (app.locals.nonceStore.has(nonce)) {
        return res.status(403).send('Replay attack detected');
    }

    // Simpan nonce baru
    app.locals.nonceStore.add(nonce);

    // Untuk menghindari penggunaan memori yang berlebihan, kita bisa batasi ukuran nonceStore
    if (app.locals.nonceStore.size > 10000) {
        app.locals.nonceStore = new Set(Array.from(app.locals.nonceStore).slice(-5000));
    }

    next(); 
});

// Endpoint API sederhana
app.post('/data', (req, res) => {
    res.send('Data received successfully');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
