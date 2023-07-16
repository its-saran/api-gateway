import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import apicache from 'apicache'

// Routes
import proxyRouter from './api/middlewares/proxyRouter.js';

// Middlewares
import authenticate from './api/middlewares/authenticate.js';
import rateLimiter from './api/middlewares/rateLimiter.js';
import incomingLogger from './api/middlewares/incomingLogger.js';
import outgoingLogger from './api/middlewares/outgoingLogger.js';
import errorHandler from './api/middlewares/errorHandler.js'


const app = express();
const cache = apicache.middleware
app.set('trust proxy', 1);

app.use(bodyParser.json());
app.use(cors());
app.use(cache('1 minute'))

app.use(rateLimiter);
app.use(incomingLogger); // Logging middleware for incoming requests
app.use(outgoingLogger); // Logging middleware for outgoing requests
app.use('/api', authenticate); // Authenticate middleware for '/api' route
app.use(['/api', '/demo'], proxyRouter); // Proxy router middleware
app.use(errorHandler) // Error Handler middleware

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/api');
});



