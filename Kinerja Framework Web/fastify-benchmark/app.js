const fastify = require('fastify')();

fastify.get('/', async (request, reply) => {
  return { message: 'Hello, World!' };
});

fastify.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Fastify app is running on ${address}`);
});

function logMemoryUsage() {
  const memoryUsage = process.memoryUsage();
  console.log(`Memory Usage: RSS = ${memoryUsage.rss}, Heap Used = ${memoryUsage.heapUsed}, Heap Total = ${memoryUsage.heapTotal}, External = ${memoryUsage.external}`);
}

setInterval(logMemoryUsage, 5000); // Log penggunaan memori setiap 5 detik
