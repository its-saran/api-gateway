import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import errorHandler from './middleware/error';

const PORT = process.env.PORT || 5000;

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 Mins
  max: 100,
});
app.use(limiter);
app.set('trust proxy', 1);

// Enable cors
app.use(cors());

// Set static folder
app.use(express.static('public'));

// Routes
app.use('/api', require('./routes'));

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
