require('dotenv').config();
const express = require('express');
const app = express();

// 1. IMPORT MIDDLEWARES
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler'); // Move this to the top with imports

// 2. IMPORT ROUTES
const healthRoutes = require('./routes/healthRoutes');
const userRoutes = require('./routes/userRoutes');

// 3. GLOBAL MIDDLEWARE
app.use(express.json());
app.use(logger);

// 4. ROUTES (The "Plumbing")
app.use('/health', healthRoutes);
app.use('/api/v1/users', userRoutes);

// 5. THE SAFETY NET (Must be AFTER routes)
app.use(errorHandler); 

// 6. SERVER INITIALIZATION
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Core Identity Service is running on port ${PORT}`);
});