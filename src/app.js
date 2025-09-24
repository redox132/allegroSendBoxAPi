// app.js
const express = require('express');
const dotenv = require('dotenv');
const productsRouter = require('./routes/products');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing form data

// Routes
app.use('/api/products', productsRouter);

// Root route
app.get('/', (req, res) => {
    res.send('Allegro Sandbox API is running');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server PORT 300`);
});
