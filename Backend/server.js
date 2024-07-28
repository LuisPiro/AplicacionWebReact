const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const tasks = [];

app.post('/api/tasks', (req, res) => {
  const { name, steps, cost, currency } = req.body;
  const newTask = { name, steps, cost, currency };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/api/rates', async (req, res) => {
  try {
    const response = await axios.get(`https://api.exchangeratesapi.io/latest?base=CLP`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exchange rates' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});