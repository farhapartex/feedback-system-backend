const express = require('express');
const { getDepartments, createDepartment } = require('../controllers/departmentController');

const router = express.Router();

router.get('/', getDepartments)

router.get('/:id', (req, res) => {
    res.send('Feedback details');
})

router.post('/', createDepartment)

router.delete('/:id', (req, res) => {
    res.send('Delete Feedback');
})

router.patch('/:id', (req, res) => {
    res.send('Update Feedback');
})

module.exports = router;