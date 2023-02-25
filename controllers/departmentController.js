const { Department } = require('../models/feedback');
const mongoose = require('mongoose');

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json(departments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
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
    createDepartment
}