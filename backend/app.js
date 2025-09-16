import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './src/routes/routes.js';

const app = express();
const frontend = process.env.FRONTEND;

console.log("✅ Allowed frontend:", frontend);

app.use(
  cors({
    origin: frontend || "http://localhost:3001", // fallback for local dev
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1', routes);

export default app;
