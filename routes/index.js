const express = require('express')
const router = express.Router();

router.post('/auth/login',require('../controllers/AuthController').login);
//Middleware
router.use('/auth',require('../controllers/AuthController').auth);
router.post('/auth/me',require('../controllers/AuthController').me);
router.post('/auth/logout',require('../controllers/AuthController').logout);

module.exports = router;