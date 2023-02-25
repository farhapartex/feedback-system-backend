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


module.exports = {
    getFeedbacks
}