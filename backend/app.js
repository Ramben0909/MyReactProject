import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './src/routes/routes.js';

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())
  : ["http://localhost:5173", "http://localhost:3001"];

console.log("✅ Allowed origins configured:", allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
       
      if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan('dev'));

morgan.token('body', (req) => {
  // We check if the body exists and is not empty before printing it
  if (req.body && Object.keys(req.body).length > 0) {
    return JSON.stringify(req.body);
  }
  return 'No Body Data';
});

// 3. Apply the custom format that includes your new ':body' token
app.use(morgan(
  '\n\x1b[36m:method\x1b[0m ' +          // Cyan Method
  '\x1b[32m:url\x1b[0m ' +             // Green URL
  '\x1b[33m:status\x1b[0m - ' +        // Yellow Status
  '\x1b[90m:response-time ms\x1b[0m\n' + // Gray Time
  '\x1b[35mPayload:\x1b[0m ' +         // Magenta Payload Label
  '\x1b[90m:body\x1b[0m\n' +           // Gray Payload Data
  '\x1b[90m---\x1b[0m'                 // Gray Divider
));


// Routes
app.use('/api/v1', routes);

export default app;