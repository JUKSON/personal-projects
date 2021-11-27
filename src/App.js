import './App.css';
import Loading from './Loading';
import Form from './Form';
import Modal from './Modal';
import { useGlobalContext } from './context';

function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
    shuffleAnswers,
    modal,
  } = useGlobalContext();

  if (waiting) {
    return <Form />;
  }

  if (loading) {
    return <Loading />;
  }
  const { question, correct_answer, incorrect_answers } = questions[index];

  const answers = shuffleAnswers(incorrect_answers, correct_answer);

  return (
    <main>
      <Modal />
      <section className="quiz">
        {modal ? (
          <p className="correct-answers">correct answers: {correct}</p>
        ) : (
          <p className="correct-answers">
            correct answers: {correct} / {index}
          </p>
        )}
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className="answer-btn"
                  onClick={() => checkAnswer(correct_answer === answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  );
}

export default App;
