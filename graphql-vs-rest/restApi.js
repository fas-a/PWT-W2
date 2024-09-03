const express = require('express');
const app = express();

// Dummy data setup for large and small datasets
const users = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: `User${i + 1}`,
  email: `user${i + 1}@example.com`,
  posts: Array.from({ length: 5 }, (_, j) => ({
    title: `Post Title ${j + 1} for User ${i + 1}`,
    content: `This is the content of post ${j + 1} for user ${i + 1}.`,
  })),
}));

// Get all users with pagination
app.get('/users', (req, res) => {
  const { name, page = 1, limit = 10 } = req.query;
  let filteredUsers = users;
  if (name) {
    filteredUsers = users.filter(user => user.name.includes(name));
  }
  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  res.json(filteredUsers.slice(start, end));
});

// Get user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Get posts for a specific user
app.get('/users/:id/posts', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (user && user.posts) {
    res.json(user.posts);
  } else {
    res.status(404).json({ error: 'User or posts not found' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`REST API running on http://localhost:${PORT}`);
});
