const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('better-sqlite3')('todolist.db');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// Create the todos table if it doesn't exist
const createTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      priority TEXT CHECK(priority IN ('High', 'Medium', 'Low')) NOT NULL
    )
  `;
  db.prepare(sql).run();
};

createTable();

// Get all to-do items
app.get('/todos', (req, res) => {
  const todos = db.prepare('SELECT * FROM todos').all();
  res.json(todos);
});

// Add a new to-do item
app.post('/todos', (req, res) => {
  const { description, priority } = req.body;

  if (!description || !priority) {
    return res.status(400).json({ error: 'Description and priority are required' });
  }

  try {
    const info = db.prepare('INSERT INTO todos (description, priority) VALUES (?, ?)').run(description, priority);
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
