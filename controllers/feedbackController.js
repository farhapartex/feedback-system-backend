const { Feedback, FeedbackComment } = require('../models/feedback');
const mongoose = require('mongoose');

const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createFeedback = async (req, res) => {
    const feedback = req.body;

    try {
        const newFeedback = await Feedback.create(feedback);
        res.status(201).json(newFeedback);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getSingleFeedback = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No feedback with that id');

    const feedback = await Feedback.findById(id);
    if (!feedback) return res.status(404).send('No feedback with that id');

    res.status(200).json(feedback);
}

const updateFeedbackByAdmin = async (req, res) => {
    const user = req.user;
    console.log(user);
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No feedback with that id');
    }

    const data = req.body;

    if (user.isAdmin === false && data.isResolved !== null) {
        return res.status(403).send({ error: 'You are not authorized to resolve this feedback' });
    }

    // {new: true} will return the updated object
    const feedback = await Feedback.findOneAndUpdate({ _id: id }, { ...data }, { new: true });

    if (!feedback) return res.status(404).send('No feedback with that id');

    res.status(200).json(feedback);
}

const createFeedbackComment = async (req, res) => {
    try {
        const feedbackComment = await FeedbackComment.create(req.body);
        res.status(201).json(feedbackComment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getCommentsByFeedbackId = async (req, res) => {
    const { feedbackId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(feedbackId)) return res.status(404).send({ error: 'No feedback with that id' });

    const comments = await FeedbackComment.find({ feedback: feedbackId });

    if (!comments) return res.status(404).send({ error: 'No comments for this feedback' });

    res.status(200).json(comments);
}


module.exports = {
    getFeedbacks,
    createFeedback,
    getSingleFeedback,
    updateFeedbackByAdmin,
    createFeedbackComment,
    getCommentsByFeedbackId
}