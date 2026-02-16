require('dotenv').config();
const express = require('express');
const app = express();

// Import Routes
const healthRoutes = require('./routes/healthRoutes');

// Middleware
app.use(express.json());

// --- Routes Integration ---
// This tells the app: any request starting with /health should use healthRoutes
app.use('/health', healthRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Core Identity Service is running on port ${PORT}`);
});