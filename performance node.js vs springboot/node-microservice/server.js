const express = require('express');
const bodyParser = require('body-parser');

// Inisialisasi aplikasi Express
const app = express();
const port = 3000;

// Middleware untuk parsing JSON
app.use(bodyParser.json());

// Endpoint API untuk mendapatkan data
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from Node.js microservice!' });
});

// Endpoint API untuk menerima data
app.post('/api/data', (req, res) => {
    const data = req.body;
    res.json({ received: data });
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
