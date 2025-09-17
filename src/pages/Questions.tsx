import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../store/Auth";

interface Question {
  id: number;
  question_text: string;
  options: string[];
  correct_option: number;
}

const Questions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState({
    question_text: "",
    options: ["", "", "", ""],
    correct_option: 0,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const { token } = useAuthStore();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/questions`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId
        ? `${import.meta.env.VITE_API_URL}/questions/${editingId}`
        : `${import.meta.env.VITE_API_URL}/questions`;
      const method = editingId ? "put" : "post";
      const response = await axios[method](url, newQuestion, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (editingId) {
        setQuestions(
          questions.map((q) => (q.id === editingId ? response.data : q))
        );
        setEditingId(null);
      } else {
        setQuestions([...questions, response.data]);
      }
      setNewQuestion({
        question_text: "",
        options: ["", "", "", ""],
        correct_option: 0,
      });
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const handleEdit = (question: Question) => {
    setEditingId(question.id);
    setNewQuestion({
      question_text: question.question_text,
      options: question.options,
      correct_option: question.correct_option,
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/questions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(questions.filter((q) => q.id !== id));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      {/* Form Card */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {editingId ? "Edit Question" : "Add a New Question"}
        </h2>
        <form onSubmit={handleCreateOrUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Question</label>
            <input
              type="text"
              value={newQuestion.question_text}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, question_text: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {newQuestion.options.map((option, index) => (
            <div key={index}>
              <label className="block text-sm font-medium mb-1">
                Option {index + 1}
              </label>
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...newQuestion.options];
                  newOptions[index] = e.target.value;
                  setNewQuestion({ ...newQuestion, options: newOptions });
                }}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1">
              Correct Option (0–3)
            </label>
            <input
              type="number"
              value={newQuestion.correct_option}
              onChange={(e) =>
                setNewQuestion({
                  ...newQuestion,
                  correct_option: Number(e.target.value),
                })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
              min="0"
              max="3"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
          >
            {editingId ? "Update Question" : "Add Question"}
          </button>
        </form>
      </div>

      {/* Questions List */}
      <div className="w-full max-w-3xl space-y-4">
        {questions.map((question) => (
          <div
            key={question.id}
            className="bg-white shadow rounded-lg p-4 flex flex-col space-y-2"
          >
            <p className="font-semibold">{question.question_text}</p>
            <ul className="list-disc ml-6 text-sm">
              {question.options.map((option, index) => (
                <li
                  key={index}
                  className={`${
                    index === question.correct_option ? "text-green-600 font-semibold" : ""
                  }`}
                >
                  {index + 1}. {option}
                </li>
              ))}
            </ul>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleEdit(question)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(question.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {questions.length === 0 && (
          <p className="text-center text-gray-500">
            No questions found. Start by adding one above.
          </p>
        )}
      </div>
    </div>
  );
};

export default Questions;
