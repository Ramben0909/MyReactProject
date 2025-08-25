import express from 'express';
// Remove this line: import connectDB from './src/config/db.js';
import routes from './src/routes/routes.js';

// Remove this line: connectDB();

const app = express();
app.use(express.json());
app.use('/api/v1', routes);

export default app;