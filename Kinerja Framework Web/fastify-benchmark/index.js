const fastify = require('fastify')();

// Middleware untuk logging
fastify.addHook('onRequest', async (request, reply) => {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
});

// Middleware untuk otentikasi (dummy)
fastify.addHook('preHandler', async (request, reply) => {
  const isAuthenticated = true; // Contoh otentikasi sederhana
  if (!isAuthenticated) {
    reply.status(401).send({ error: 'Unauthorized' });
  }
});

// Middleware untuk validasi (dummy)
fastify.addHook('preHandler', async (request, reply) => {
  if (!request.headers['x-custom-header']) {
    reply.status(400).send({ error: 'Bad Request: Missing header' });
  }
});

// Middleware untuk manipulasi data
fastify.addHook('preHandler', async (request, reply) => {
  request.processedData = { message: 'Processed by middleware' };
});

// Route handler
fastify.get('/', async (request, reply) => {
  return { message: 'Hello, World!', data: request.processedData };
});

fastify.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Fastify app is running on ${address}`);
});
