const express = require('express');
const { getFeedbacks, createFeedback, updateFeedbackByAdmin, getSingleFeedback, createFeedbackComment, getCommentsByFeedbackId } = require('../controllers/feedbackController');
const { authTokenMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.get('/', authTokenMiddleware, getFeedbacks)

router.get('/:id', authTokenMiddleware, getSingleFeedback)

router.post('/', authTokenMiddleware, createFeedback)

router.post('/createComment', authTokenMiddleware, createFeedbackComment)

router.delete('/:id', (req, res) => {
    res.send('Delete Feedback');
})

router.patch('/:id', authTokenMiddleware, updateFeedbackByAdmin)

router.get('/:feedbackId/comments', authTokenMiddleware, getCommentsByFeedbackId)

module.exports = router;