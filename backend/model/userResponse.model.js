const mongoose = require('mongoose');

const UserResponseSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  userName: { type: String, required: true },
  responses: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      selectedOption: { type: String, required: true }
    }
  ],
  score: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserResponse', UserResponseSchema);
