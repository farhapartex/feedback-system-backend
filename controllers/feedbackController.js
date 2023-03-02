const { Department, Feedback } = require('../models/feedback');
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

// TODO: have to add JWT token to this route
const updateFeedbackByAdmin = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No feedback with that id');
    }

    // {new: true} will return the updated object
    const feedback = await Feedback.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

    if (!feedback) return res.status(404).send('No feedback with that id');

    res.status(200).json(feedback);
}


module.exports = {
    getFeedbacks,
    createFeedback,
    getSingleFeedback,
    updateFeedbackByAdmin
}