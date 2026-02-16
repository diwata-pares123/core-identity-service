require('dotenv').config();
const express = require('express');
const app = express();

const supabase = require('./config/supabaseClient');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const healthRoutes = require('./routes/healthRoutes');
const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use('/health', healthRoutes);
app.use('/api/v1/users', userRoutes);

// Error Handler (Always last!)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Core Identity Service is running on port ${PORT}`);
});