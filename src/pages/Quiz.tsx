import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/Auth';
import { useQuizStore } from '../store/quiz';

const Quiz = () => {
  const { token } = useAuthStore();
  const {
    questions,
    currentQuestion,
    answers,
    startTime,
    setQuestions,
    setAnswer,
    nextQuestion,
    prevQuestion,
    startQuiz,
    resetQuiz,
  } = useQuizStore();
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    startQuiz();
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (startTime) {
      const timer = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/quiz/start`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/quiz/submit`,
        answers,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setResults(response.data);
      resetQuiz();
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (results) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl mb-4 font-semibold">Quiz Results</h2>
          <p>Total Score: {results.totalScore}</p>
          <p>
            Correct Answers: {results.correctAnswers}/{results.totalQuestions}
          </p>
          <p>
            Time Taken: {Math.floor(timeElapsed / 60)}:
            {(timeElapsed % 60).toString().padStart(2, '0')}
          </p>
          <button
            onClick={() => {
              setResults(null);
              resetQuiz();      // clear store
              fetchQuestions();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-xl w-full">
        <h2 className="text-2xl mb-2 font-semibold text-center">
          Question {currentQuestion + 1} of {questions.length}
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Time: {Math.floor(timeElapsed / 60)}:
          {(timeElapsed % 60).toString().padStart(2, '0')}
        </p>

        <p className="text-lg mb-6 font-medium text-center">{question.question_text}</p>

        <div className="space-y-3">
          {question.options.map((option: string, index: number) => (
            <label
              key={index}
              className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                checked={answers[question.id] === index}
                onChange={() => setAnswer(question.id, index)}
                className="mr-3"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          {currentQuestion > 0 && (
            <button
              onClick={prevQuestion}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Previous
            </button>
          )}
          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={nextQuestion}
              className="ml-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="ml-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
