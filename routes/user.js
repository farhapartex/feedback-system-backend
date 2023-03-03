const express = require('express');
const { registerEmployee, userLogin } = require('../controllers/userController');

const router = express.Router();

router.post("/register", registerEmployee)
router.post("/login", userLogin)

module.exports = router;