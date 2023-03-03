const express = require('express');
const { getDepartments, createDepartment, getSingleDepartment, updateDepartment } = require('../controllers/departmentController');
const { authTokenMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.get('/', authTokenMiddleware, getDepartments)

router.get('/:id', authTokenMiddleware, getSingleDepartment)

router.post('/', authTokenMiddleware, createDepartment)

router.delete('/:id', (req, res) => {
    res.send('Delete Feedback');
})

router.patch('/:id', authTokenMiddleware, updateDepartment)

module.exports = router;