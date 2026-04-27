import app from './index.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config({path: './backend/config/config.env'});

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});