const connectDB = require('./config/connection');

const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.json());

const userRoutes = require('./routes/api/userRoutes');
const projectRoutes = require('./routes/api/projectRoutes');
const taskRoutes = require('./routes/api/taskRoutes');

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api', taskRoutes);

app.listen(PORT, () => {
    console.log(`SERVER RUNNING AT PORT ${PORT}`);
});