const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Data pengguna simulasi
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

// Penyimpanan session di memori (simulasi)
let sessions = {};

// Route Login menggunakan Session Storage
app.post('/login-session', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const sessionId = new Date().getTime().toString(); // Buat ID sesi sederhana
        sessions[sessionId] = { userId: user.id };
        return res.json({ sessionId });
    }

    res.status(401).json({ message: 'Invalid credentials' });
});

// Route dilindungi menggunakan Session Storage
app.get('/protected-session', (req, res) => {
    const sessionId = req.headers['session-id'];

    if (!sessionId || !sessions[sessionId]) {
        return res.status(403).json({ message: 'Invalid session' });
    }

    res.json({ message: `Welcome user with session ID ${sessionId}` });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
