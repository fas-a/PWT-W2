const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Menyediakan file statis untuk klien

// Data pengguna (harusnya ini di database)
let users = {};

// Endpoint untuk pendaftaran pengguna
app.post('/register', (req, res) => {
  const { username, publicKey } = req.body;
  if (users[username]) {
    return res.status(400).json({ message: 'User already exists!' });
  }
  users[username] = { publicKey };
  res.status(200).json({ message: 'User registered successfully!' });
});

// Endpoint untuk autentikasi pengguna
app.post('/authenticate', (req, res) => {
  const { username, signature } = req.body;
  const user = users[username];
  if (!user) {
    return res.status(404).json({ message: 'User not found!' });
  }

  // Di sini Anda akan memverifikasi signature dengan kunci publik
  // Untuk tujuan eksperimen, kita anggap signature valid
  res.status(200).json({ message: 'Authentication successful!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});