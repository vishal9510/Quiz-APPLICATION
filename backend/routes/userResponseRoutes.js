const express = require('express');
const { check, validationResult } = require('express-validator');
const userResponseController = require('../controllers/userResponseController');
const router = express.Router();


// Validation for submitting user responses
const validateUserResponse = [
    check('quizId').not().isEmpty().withMessage('Quiz ID is required'),
    check('userName').not().isEmpty().withMessage('User name is required'),
    check('responses').isArray({ min: 1 }).withMessage('At least one response is required'),
    check('responses.*.questionId').not().isEmpty().withMessage('Each response must include a question ID'),
    check('responses.*.selectedOption').not().isEmpty().withMessage('Each response must include a selected option')
];


// Routes for handling user responses
router.post('/', validateUserResponse, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    userResponseController.submitUserResponse(req, res, next);
});

router.get('/quiz/:quizId', userResponseController.getUserResponsesForQuiz);

module.exports = router;
