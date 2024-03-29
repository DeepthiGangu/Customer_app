const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');


const app = express();


app.use(cors());

// Parse JSON requests
app.use(express.json());


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'customerdb',
  password: '2310',
  port: 5432,
});



// route to get all customers
app.get('/api/customers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// route to get all customers with sorting
app.get('/api/customers/sorted', async (req, res) => {
  const { sortBy } = req.query;
  try {
    const result = await pool.query(`SELECT * FROM customers ORDER BY ${sortBy}`);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching sorted customers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// route to get paginated customers
app.get('/api/customers/paginated', async (req, res) => {
  const { page, pageSize } = req.query;
  const offset = (page - 1) * pageSize;
  try {
    const result = await pool.query(`SELECT * FROM customers OFFSET $1 LIMIT $2`, [offset, pageSize]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching paginated customers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// route to get all customers with formatted date and time
app.get('/api/customers', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        sno,
        customer_name,
        age,
        phone,
        location,
        to_char(created_at, 'YYYY-MM-DD') as date,
        to_char(created_at, 'HH24:MI:SS') as time
      FROM customers
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
