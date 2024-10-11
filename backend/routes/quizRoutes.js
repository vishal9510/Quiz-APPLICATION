const express = require('express');
const { check, validationResult } = require('express-validator');
const quizController = require('../controllers/quizController');
const router = express.Router();


// Validation for quiz creation
const validateQuiz = [
    check('title').not().isEmpty().withMessage('Title is required'),
    check('questions').isArray({ min: 1 }).withMessage('At least one question is required'),
    check('questions.*.question').not().isEmpty().withMessage('Each question must have a question text'),
    check('questions.*.options').isArray({ min: 2 }).withMessage('Each question must have at least two options'),
    check('questions.*.correctAnswer').not().isEmpty().withMessage('Each question must have a correct answer')
];

// Routes for quiz management
router.post('/createQuiz', validateQuiz, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    quizController.createQuiz(req, res, next);
});
router.get('/getAllQuizzes', quizController.getAllQuizzes);
router.get('/:id', quizController.getQuizById);

module.exports = router;
