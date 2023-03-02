const express = require('express');
const { getFeedbacks, createFeedback, updateFeedbackByAdmin, getSingleFeedback, createFeedbackComment, getCommentsByFeedbackId } = require('../controllers/feedbackController');

const router = express.Router();

router.get('/', getFeedbacks)

router.get('/:id', getSingleFeedback)

router.post('/', createFeedback)

router.post('/createComment', createFeedbackComment)

router.delete('/:id', (req, res) => {
    res.send('Delete Feedback');
})

router.patch('/:id', updateFeedbackByAdmin)

router.get('/:feedbackId/comments', getCommentsByFeedbackId)

module.exports = router;