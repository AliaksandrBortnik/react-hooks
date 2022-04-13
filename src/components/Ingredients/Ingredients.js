import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  const addIngredientHandler = (ingredient) => {
    setIngredients(prevState => ([
      ...prevState,
      ingredient
    ]));
  };

  return (
    <div className="App">
      <IngredientForm onSubmit={addIngredientHandler}/>

      <section>
        <Search />
        {/* TODO: display a list of ingredients */}
      </section>
    </div>
  );
}

export default Ingredients;
