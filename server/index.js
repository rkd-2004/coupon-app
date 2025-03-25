const express = require('express');
const { sequelize } = require('./models');
const app = express();

// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Coupon API is running! Use POST /api/claim to get a coupon');
});

// Import routes
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// Error handling
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
sequelize.sync({ force: false })
  .then(() => {
    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Database sync failed:', err));