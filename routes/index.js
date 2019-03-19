const express = require('express')
const router = express.Router();

router.post('/auth/login',require('../controllers/AuthController').login);
//Middleware
router.use('/auth',require('../controllers/AuthController').auth);
router.post('/auth/me',require('../controllers/AuthController').me);
router.post('/auth/logout',require('../controllers/AuthController').logout);
router.get('/auth/quizes',require('../controllers/QuizesController').index);
router.post('/auth/quizes',require('../controllers/QuizesController').create);
//Midleware
router.use('/auth',require('../middlewares/QuizMiddleware').perrmission);
router.patch('/auth/quizes/:quiz',require('../middlewares/QuizMiddleware').perrmission,require('../controllers/QuizesController').update);
router.delete('/auth/quizes/:quiz',require('../middlewares/QuizMiddleware').perrmission,require('../controllers/QuizesController').delete);
router.get('/auth/quizes/:quiz',require('../middlewares/QuizMiddleware').perrmission,require('../controllers/QuizesController').show);
//Middleware
router.use('/auth',require('../middlewares/QuestionMiddleware').perrmission);
router.get('/auth/questions/:question',require('../controllers/QuestionsController').show);
router.post('/auth/questions',require('../controllers/QuestionsController').create);
router.patch('/auth/questions/:question',require('../controllers/QuestionsController').update);
router.delete('/auth/questions/:question',require('../controllers/QuestionsController').delete);
router.get('/auth/answers/:answer',require('../controllers/AnswersController').show);
router.post('/auth/answers',require('../controllers/AnswersController').create);
router.patch('/auth/answers/:answer',require('../controllers/AnswersController').update);
router.delete('/auth/answers/:answer',require('../controllers/AnswersController').delete);

module.exports = router;