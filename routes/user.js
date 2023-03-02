const express = require('express');
const { registerEmployee } = require('../controllers/userController');

const router = express.Router();

router.post("/register", registerEmployee)

module.exports = router;