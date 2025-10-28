// pages/api/middlware/cors.js

import Cors from 'micro-cors';
import rateLimit from 'express-rate-limit';

const rateLimitter=rateLimit({
      windowMs: 10 * 60 * 1000, // 10 minutes
  max: 50, // Max 100 requests per window per IP
  message: 'Too many requests, please try again later.',
})

// Initialize CORS middleware
const cors = Cors({
    origin: '*', // Allow requests from any origin
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    // Allow specific HTTP methods
});




export default  cors;