app.get('/api/rates', async (req, res) => {
    try {
      const response = await axios.get(`https://v6.exchangerate
      res.json(response.data);-api.com/latest/USD`); // https://v6.exchangerate-api.com/v6/30f1158b553f63c3e8f4d596/latest/USD
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch exchange rates' });
    }
  });  