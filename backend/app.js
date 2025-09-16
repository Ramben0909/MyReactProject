import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './src/routes/routes.js';

const app = express();
const allowedOrigins = [
  "http://localhost:5173",   // vite dev
  "http://localhost:3001",   // fallback
  "https://my-react-project-chi-eight.vercel.app/api/v1",
];

console.log("✅ Allowed frontend:",allowedOrigins);

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

// Routes
app.use('/api/v1', routes);

export default app;
