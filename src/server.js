require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const readmeRoutes = require('./routes/readme-routes');
const errorHandler = require('./utils/error-handler');

const app = express();

app.set('trust proxy', 1);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour in milliseconds
  max: 10, // limit each IP to 1 request per windowMs
  message: (req, res) => {
    const timeRemaining = Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000 / 60);
    return {
      error: `You've reached your request limit. Please try again in ${timeRemaining} minutes.`
    };
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  },
});

// Apply rate limiting to all routes
app.use(limiter);

// Routes
app.use('/api', readmeRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));