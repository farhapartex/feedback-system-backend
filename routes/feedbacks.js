const express = require('express');
const { getFeedbacks, createFeedback, updateFeedbackByAdmin, getSingleFeedback } = require('../controllers/feedbackController');

const router = express.Router();

router.get('/', getFeedbacks)

router.get('/:id', getSingleFeedback)

router.post('/', createFeedback)

router.delete('/:id', (req, res) => {
    res.send('Delete Feedback');
})

router.patch('/:id', updateFeedbackByAdmin)

module.exports = router;