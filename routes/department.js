const express = require('express');
const { getDepartments, createDepartment, getSingleDepartment, updateDepartment } = require('../controllers/departmentController');

const router = express.Router();

router.get('/', getDepartments)

router.get('/:id', getSingleDepartment)

router.post('/', createDepartment)

router.delete('/:id', (req, res) => {
    res.send('Delete Feedback');
})

router.patch('/:id', updateDepartment)

module.exports = router;