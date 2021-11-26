import { useGlobalContext } from './context';
import categories from './categories';

const Form = () => {
  const { form, error, handleSubmit, handleChange } = useGlobalContext();

  return (
    <main>
      <section className="quiz quiz-small">
        <h2>Quiz App</h2>
        <form className="setup-form">
          <div className="form-control">
            <label htmlFor="amount">Number of questions</label>
            <input
              type="text"
              name="amount"
              id="amount"
              className="form-input"
              value={form.amount}
              onChange={handleChange}
              min={1}
              max={50}
            />
          </div>
          <div className="form-control">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              className="form-input"
              value={form.category}
              onChange={handleChange}
            >
              {categories.map((category, index) => {
                return (
                  <option
                    key={index}
                    value={category.id}
                    dangerouslySetInnerHTML={{ __html: category.name }}
                  />
                );
              })}
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="difficulty">difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              className="form-input"
              value={form.difficulty}
              onChange={handleChange}
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="difficulty">type</label>
            <select
              name="type"
              id="type"
              className="form-input"
              value={form.type}
              onChange={handleChange}
            >
              <option value="any">any</option>
              <option value="multiple">multiple</option>
              <option value="boolean">true / false</option>
            </select>
          </div>
          {error && (
            <p className="error">
              can't generate questions, please try different options
            </p>
          )}
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            start
          </button>
        </form>
      </section>
    </main>
  );
};

export default Form;
