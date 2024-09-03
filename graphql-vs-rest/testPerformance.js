const axios = require('axios');
const { performance } = require('perf_hooks');

async function testRestApi() {
  const start = performance.now();
  try {
    const response = await axios.get('http://localhost:3000/users');
    const end = performance.now();
    console.log('REST API Response Time:', (end - start).toFixed(2), 'ms');
  } catch (error) {
    console.error('Error testing REST API:', error);
  }
}

async function testGraphqlApi() {
  const start = performance.now();
  try {
    const response = await axios.post('http://localhost:4000/graphql', {
      query: `{
        users {
          id
          name
          email
        }
      }`
    });
    const end = performance.now();
    console.log('GraphQL API Response Time:', (end - start).toFixed(2), 'ms');
  } catch (error) {
    console.error('Error testing GraphQL API:', error);
  }
}

async function runTests() {
  console.log('Testing REST API...');
  await testRestApi();

  console.log('Testing GraphQL API...');
  await testGraphqlApi();
}

runTests();
