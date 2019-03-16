const express = require('express')
const router = express.Router();

router.post('/auth/login',require('../controllers/AuthController').login);
//Middleware
router.use('/auth',require('../controllers/AuthController').auth);
router.post('/auth/me',require('../controllers/AuthController').me);
router.post('/auth/logout',require('../controllers/AuthController').logout);
router.get('/auth/grades',require('../controllers/GradesController').index);
router.post('/auth/grades',require('../controllers/GradesController').create);
router.patch('/auth/grades/:grade',require('../controllers/GradesController').update);
router.delete('/auth/grades/:grade',require('../controllers/GradesController').delete);
router.get('/auth/grades/:grade',require('../controllers/GradesController').show);
router.get('/auth/notifications/:notification',require('../controllers/NotificationsController').show);
router.post('/auth/notifications',require('../controllers/NotificationsController').create);
router.delete('/auth/notifications/:notification',require('../controllers/NotificationsController').delete);
router.post('/auth/mails',require('../controllers/MailsController').create);
router.delete('/auth/mails/:mail',require('../controllers/MailsController').delete);

module.exports = router;