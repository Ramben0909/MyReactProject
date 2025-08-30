import express from 'express';
import morgan from 'morgan';              // Import morgan
import routes from './src/routes/routes.js';

const app = express();

app.use(express.json());

app.use(morgan('dev'));                   // <-- This logs each request endpoint to the terminal

app.use('/api/v1', routes);

export default app;
