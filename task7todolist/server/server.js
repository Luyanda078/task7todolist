const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('better-sqlite3')('todolist.db');
const bcrypt = require('bcrypt');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// Create tables if they don't exist
const createTables = () => {
  const sqlTodos = `
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      priority TEXT CHECK(priority IN ('High', 'Medium', 'Low')) NOT NULL,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    )
  `;
  const sqlUsers = `
    CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      phone_number TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL
    )
  `;
  db.prepare(sqlTodos).run();
  db.prepare(sqlUsers).run();
};

createTables();

// Sign up route
app.post('/signup', async (req, res) => {
  const { fullName, phoneNumber, email, password } = req.body;

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const info = db.prepare('INSERT INTO users (full_name, phone_number, email, password_hash) VALUES (?, ?, ?, ?)').run(fullName, phoneNumber, email, passwordHash);
    res.status(201).json({ userId: info.lastInsertRowid });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ userId: user.user_id, fullName: user.full_name });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all to-do items
app.get('/todos', (req, res) => {
  const todos = db.prepare('SELECT * FROM todos').all();
  res.json(todos);
});

// Add a new to-do item
app.post('/todos', (req, res) => {
  const { description, priority, userId } = req.body;

  if (!description || !priority || !userId) {
    return res.status(400).json({ error: 'Description, priority, and user ID are required' });
  }

  try {
    const info = db.prepare('INSERT INTO todos (description, priority, user_id) VALUES (?, ?, ?)').run(description, priority, userId);
    res.status(201).json({ id: info.lastInsertRowid, description, priority });
  } catch (err) {
    res.status(400).json({ error: 'Failed to add to-do item' });
  }
});

// Update an existing to-do item
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { description, priority } = req.body;

  if (!description || !priority) {
    return res.status(400).json({ error: 'Description and priority are required' });
  }

  const info = db.prepare('UPDATE todos SET description = ?, priority = ? WHERE id = ?').run(description, priority, id);

  if (info.changes > 0) {
    res.json({ message: 'To-Do item updated successfully' });
  } else {
    res.status(404).json({ error: 'To-Do item not found' });
  }
});

// Delete a to-do item
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const info = db.prepare('DELETE FROM todos WHERE id = ?').run(id);

  if (info.changes > 0) {
    res.json({ message: 'To-Do item deleted successfully' });
  } else {
    res.status(404).json({ error: 'To-Do item not found' });
  }
});

// Search to-do items by keyword
app.get('/todos/search', (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required for search' });
  }

  const todos = db.prepare('SELECT * FROM todos WHERE description LIKE ?').all(`%${keyword}%`);
  res.json(todos);
});

// Test endpoint
app.get('/test', (req, res) => {
  res.send('This is a test endpoint!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
