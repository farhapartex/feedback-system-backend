const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
})

router.get('/:id', (req, res) => {
    res.send('Feedback details');
})

router.post('/', (req, res) => {
    res.send('New Feedback');
})

router.delete('/:id', (req, res) => {
    res.send('Delete Feedback');
})

router.patch('/:id', (req, res) => {
    res.send('Update Feedback');
})

module.exports = router;