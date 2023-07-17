import express from 'express';
import cors from 'cors';
import apicache from 'apicache'

// Routes
import proxyRouter from './api/middlewares/proxyRouter.js';

// Utils
import getConfig from './api/utils/getConfig.js';

// Middlewares
import authenticate from './api/middlewares/authenticate.js';
import rateLimiter from './api/middlewares/rateLimiter.js';
import incomingLogger from './api/middlewares/incomingLogger.js';
import outgoingLogger from './api/middlewares/outgoingLogger.js';
import errorHandler from './api/middlewares/errorHandler.js'

const config = await getConfig()
const cache = apicache.middleware(config.apicache)
const incomingLog = incomingLogger(config)
const outgoingLog = outgoingLogger(config)
const rateLimit = rateLimiter(config.rateLimit);
const proxyRoute = proxyRouter(config.target)
const jsonParser = express.json({ limit: '50mb' })

const app = express()
app.set('trust proxy', 1);

app.use(jsonParser)
app.use(cors());
app.use(cache)
app.use(incomingLog); // Logging middleware for incoming requests
app.use(outgoingLog); // Logging middleware for outgoing requests
app.use('/api', authenticate); // Authenticator middleware for '/api' route
app.use('/demo', rateLimit); // Rate limiter middleware for '/demo' route
app.use(['/api', '/demo'], proxyRoute); // Proxy router middleware
app.use(errorHandler) // Error Handler middleware

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/api');
});



