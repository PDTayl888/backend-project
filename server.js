const connectDB = require('./config/connection');

const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.json());
const bookRoutes = require('./routes/productRoutes');

app.use('/api/products', bookRoutes);

app.listen(PORT, () => {
    console.log(`SERVER RUNNING AT PORT ${PORT}`);
});