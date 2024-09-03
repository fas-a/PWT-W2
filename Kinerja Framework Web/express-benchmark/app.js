const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello, World!' });
});

app.listen(3000, () => {
  console.log('Express app is running on http://localhost:3000');
});

function logMemoryUsage() {
  const memoryUsage = process.memoryUsage();
  console.log(`Memory Usage: RSS = ${memoryUsage.rss}, Heap Used = ${memoryUsage.heapUsed}, Heap Total = ${memoryUsage.heapTotal}, External = ${memoryUsage.external}`);
}

setInterval(logMemoryUsage, 5000); // Log penggunaan memori setiap 5 detik
