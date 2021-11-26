import { useGlobalContext } from './context';

const Modal = () => {
  const { questions, modal, correct, playAgain } = useGlobalContext();

  return (
    <div className={`${modal ? 'modal-container isOpen' : 'modal-container'}`}>
      <div className="modal-content">
        <h2>congrats!</h2>
        <p>
          You answered {((correct / questions.length) * 100).toFixed(0)}% of
          questions correct
        </p>
        <button className="close-btn" onClick={playAgain}>
          play again
        </button>
      </div>
    </div>
  );
};

export default Modal;
