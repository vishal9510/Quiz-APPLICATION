const UserResponse = require('../model/userResponse.model');
const Quiz = require('../model/quiz.model');

// Submit user responses and calculate score
const submitUserResponse = async (req, res) => {
    try {
      const { quizId, userName, responses } = req.body;
  
      // Check if the quiz exists
      const quiz = await Quiz.findById(quizId);
      if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
  
      let score = 0;
  
      // Loop through user responses
      for (const response of responses) {
        const question = quiz.questions.id(response.questionId);
  
        // Check if question exists in the quiz
        if (!question) {
          return res.status(400).json({ error: `Invalid question ID: ${response.questionId}` });
        }
  
        // Check if selected option is one of the available options
        if (!question.options.includes(response.selectedOption)) {
          return res.status(400).json({
            error: `Invalid selected option for question: ${response.questionId}`
          });
        }
  
        // Increment score if the answer is correct
        if (question.correctAnswer === response.selectedOption) {
          score += 1;
        }
      }
  
      // Save the user response with the score
      const userResponse = new UserResponse({
        quizId,
        userName,
        responses,
        score
      });
      await userResponse.save();
  
      // Return success response
      res.status(201).json({
        message: 'Response submitted successfully',
        score,
        totalQuestions: quiz.questions.length
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Get all responses for a quiz
const getUserResponsesForQuiz = async (req, res) => {
  try {
    const responses = await UserResponse.find({ quizId: req.params.quizId });
    res.status(200).json(responses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { submitUserResponse, getUserResponsesForQuiz };
