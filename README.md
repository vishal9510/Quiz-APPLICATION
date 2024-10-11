Features:
Create, retrieve, and manage quizzes.
Submit user answers for a quiz.
Automatically calculate the user's score based on correct answers.
Validations for quiz creation and user responses.
Centralized error handling for consistent responses.

Validations
Quiz Creation Validation
In routes/quizRoutes.js, the quiz creation endpoint ensures:

The quiz has a title.
Each question has a question text, at least two options, and a correctAnswer.
User Response Validation
In routes/userResponseRoutes.js, the response submission endpoint ensures:

The quizId, userName, and responses fields are provided.
Each response has a valid questionId and a selectedOption.


Error Handling
A centralized error handler is implemented in app.js to catch and respond to any errors that occur during request processing. If any validation fails or an invalid quiz/question is referenced, the API responds with a structured error message, including details about what went wrong.
