const QuizHelper = {
  /**
   * return key save offline quiz. Example: quiz_1
   */
  SaveKeyQuiz: (quizId) => {
    return `quiz_${quizId}`;
  },
  /**
   * return key save offline quiz. Example: answer_1
   */
  SaveQuizOffline: (quizId, quizName) => {
    return `answer_${quizId}_${quizName}`;
  },
};
export default QuizHelper;
