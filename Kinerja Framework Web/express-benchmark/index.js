const express = require('express');
const app = express();

// Middleware untuk logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware untuk otentikasi (dummy)
app.use((req, res, next) => {
  const isAuthenticated = true; // Contoh otentikasi sederhana
  if (!isAuthenticated) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  next();
});

// Middleware untuk validasi (dummy)
app.use((req, res, next) => {
  if (!req.headers['x-custom-header']) {
    return res.status(400).send({ error: 'Bad Request: Missing header' });
  }
  next();
});

// Middleware untuk manipulasi data
app.use((req, res, next) => {
  req.processedData = { message: 'Processed by middleware' };
  next();
});

// Route handler
app.get('/', (req, res) => {
  res.send({ message: 'Hello, World!', data: req.processedData });
});

app.listen(3000, () => {
  console.log('Express app is running on http://localhost:3000');
});
