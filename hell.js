const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000
app.use(express.json());

const users_db = './users.json';

// Helper function to read users from JSON file
function readUsers() {
  const data = fs.readFileSync(users_db);
  return JSON.parse(data);
}

// Helper function to write users to JSON file
function writeUsers(users) {
  fs.writeFileSync(users_db, JSON.stringify(users, null, 2));
}

// GET all users
app.get('/users', (req, res) => {
  const users = readUsers().users;
  res.json(users);
});

// GET user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const users = readUsers().users;
  const user = users.find(user => user.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// POST new user
app.post('/users', (req, res) => {
  const users = readUsers().users;
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  writeUsers({ users });
  res.status(201).json(newUser);
});

// PUT update user
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const users = readUsers().users;
  const index = users.findIndex(user => user.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body, id: userId };
    writeUsers({ users });
    res.json(users[index]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE user
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const users = readUsers().users;
  const index = users.findIndex(user => user.id === userId);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1)[0];
    writeUsers({ users });
    res.json(deletedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Run server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
