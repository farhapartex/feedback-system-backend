require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const feedbacksRoutes = require('./routes/feedbacks');
const departmentRoutes = require('./routes/department');
const userRoutes = require('./routes/user');

const app = express();

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/v1/departments', departmentRoutes)
app.use('/api/v1/feedbacks', feedbacksRoutes)
app.use('/api/v1/users', userRoutes)



mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log('Server is running on port 8000');
    });
}).catch((err) => {
    console.log(err);
})