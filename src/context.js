import React from 'react';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import categories from './categories';

const API_URL = 'https://opentdb.com/api.php?';

const QuizContext = React.createContext();

const QuizProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [modal, setModal] = useState(false);
  // const [form, setForm] = useState({
  //   amount: 1,
  //   category: '9',
  //   difficulty: 'easy',
  // });
  const [form, setForm] = useState({
    amount: 1,
    category: '9',
    difficulty: 'easy',
    type: 'any',
  });

  const fetchData = async (url) => {
    setLoading(true);
    setWaiting(false);
    const response = await axios.get(url).catch((error) => console.log(error));
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setError(true);
        setWaiting(true);
      }
    } else {
      setWaiting(true);
    }
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      }
      return index;
    });
  };

  const checkAnswer = (arg) => {
    if (arg) {
      setCorrect((oldCorrect) => oldCorrect + 1);
    }
    nextQuestion();
  };

  const openModal = () => {
    setModal(true);
  };

  const playAgain = () => {
    setModal(false);
    setWaiting(true);
    setCorrect(0);
    setForm({
      amount: 1,
      category: '9',
      difficulty: 'easy',
      type: 'any',
    });
  };

  const shuffleAnswers = (wrong, correct) => {
    let answers = [correct, ...wrong];
    answers.sort(() => Math.random() - 0.5);

    return answers;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty, type } = form;
    let url = '';
    if (type !== 'any') {
      url = `${API_URL}amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    } else {
      url = `${API_URL}amount=${amount}&category=${category}&difficulty=${difficulty}`;
    }
    // const url = `${API_URL}amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    fetchData(url);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <QuizContext.Provider
      value={{
        waiting,
        loading,
        questions,
        error,
        index,
        correct,
        modal,
        form,
        nextQuestion,
        checkAnswer,
        playAgain,
        handleSubmit,
        handleChange,
        shuffleAnswers,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(QuizContext);
};

export { QuizContext, QuizProvider };
