const express = require('express');
const feedbacksRoutes = require('./routes/feedbacks');

const app = express();

// routes
app.use('/api/feedbacks', feedbacksRoutes)

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

