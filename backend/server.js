import app from './index.js';
import dotenv from 'dotenv';

dotenv.config({path: './backend/config/config.env'});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});