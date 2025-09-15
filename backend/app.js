// app.js
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './src/routes/routes.js';

const app = express();

// ✅ Enable CORS
app.use(
  cors({
    origin: "http://localhost:3001", // your React app
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if you send cookies or auth headers
  })
);

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1', routes);

export default app;
