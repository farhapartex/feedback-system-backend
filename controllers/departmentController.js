const { Department } = require('../models/feedback');
const mongoose = require('mongoose');

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find({}).sort({ createdAt: -1 });
        res.status(200).json(departments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getSingleDepartment = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No department with that id');
    const department = await Department.findById(id);

    if (!department) return res.status(404).send('No department with that id');

    res.status(200).json(department);
}

const createDepartment = async (req, res) => {
    const department = req.body;

    try {
        const newDepartment = await Department.create(department);
        res.status(201).json(newDepartment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


module.exports = {
    getDepartments,
    createDepartment,
    getSingleDepartment
}