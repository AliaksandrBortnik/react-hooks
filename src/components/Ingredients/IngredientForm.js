import React, {useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from '../UI/LoadingIndicator';

const IngredientForm = React.memo(props => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const titleChangeHandler = e => {
    setTitle(e.target.value);
  };

  const amountChangeHandler = e => {
    setAmount(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();

    const ingredient = { title, amount };
    props.onSubmit(ingredient);
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input value={title} onChange={titleChangeHandler} type="text" id="title" />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input value={amount} onChange={amountChangeHandler} type="number" id="amount" />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.isLoading && <LoadingIndicator/>}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
