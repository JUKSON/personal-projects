import { useGlobalContext } from './context';

const Modal = () => {
  const { questions, modal, correct, playAgain } = useGlobalContext();

  const answerPercent = ((correct / questions.length) * 100).toFixed(0);

  return (
    <div className={`${modal ? 'modal-container isOpen' : 'modal-container'}`}>
      <div className="modal-content">
        {answerPercent < 50 ? (
          <h2 style={{ color: '#E34217' }}>thats bad! 😐</h2>
        ) : (
          <h2 style={{ color: 'green' }}>congrats! 👍</h2>
        )}
        <p>You answered {answerPercent}% of questions correct</p>
        <button className="close-btn" onClick={playAgain}>
          play again
        </button>
      </div>
    </div>
  );
};

export default Modal;
