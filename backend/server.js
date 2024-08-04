const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '168179',
  database: 'expense_db'
});

// Connect to the database
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

app.use(cors());
app.use(bodyParser.json());

// API endpoint to add an expense
app.post('/expenses', (req, res) => {
  const { amountValue, descriptionValue, categoryValue } = req.body;
  const query = 'INSERT INTO expenses (amount, description, category) VALUES (?, ?, ?)';
  db.query(query, [amountValue, descriptionValue, categoryValue], (err, result) => {
    if (err) throw err;
    res.send('Expense added');
  });
});

// API endpoint to get all expenses
app.get('/expenses', (req, res) => {
  db.query('SELECT * FROM expenses', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API endpoint to delete an expense
app.delete('/expenses/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM expenses WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.send('Expense deleted');
  });
});

// API endpoint to update an expense
app.put('/expenses/:id', (req, res) => {
  const { id } = req.params;
  const { amountValue, descriptionValue, categoryValue } = req.body;
  const query = 'UPDATE expenses SET amount = ?, description = ?, category = ? WHERE id = ?';
  db.query(query, [amountValue, descriptionValue, categoryValue, id], (err, result) => {
    if (err) throw err;
    res.send('Expense updated');
  });
});

// API endpoint to partially update an expense
app.patch('/expenses/:id', (req, res) => {
  const { id } = req.params;
  const { amountValue, descriptionValue, categoryValue } = req.body;
  
  // Build the SET clause dynamically based on which fields are provided
  let updateFields = [];
  let updateValues = [];
  
  if (amountValue) {
    updateFields.push('amount = ?');
    updateValues.push(amountValue);
  }
  
  if (descriptionValue) {
    updateFields.push('description = ?');
    updateValues.push(descriptionValue);
  }
  
  if (categoryValue) {
    updateFields.push('category = ?');
    updateValues.push(categoryValue);
  }
  
  // Ensure there's at least one field to update
  if (updateFields.length === 0) {
    return res.status(400).send('No fields to update');
  }

  // Add the ID to the values array
  updateValues.push(id);
  
  const query = `UPDATE expenses SET ${updateFields.join(', ')} WHERE id = ?`;
  
  db.query(query, updateValues, (err, result) => {
    if (err) throw err;
    res.send('Expense updated');
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
