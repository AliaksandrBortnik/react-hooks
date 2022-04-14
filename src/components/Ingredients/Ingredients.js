import React, {useCallback, useState} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  const searchChangeHandler = useCallback((ingredients) => {
    setIngredients(ingredients);
  }, []);

  const addIngredientHandler = (ingredient) => {
    fetch('https://react-complete-hooks-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json',{
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((resp) => resp.json())
      .then(data => {
        setIngredients(prevState => [
          ...prevState,
          { id: data.name, ...ingredient }
        ]);
      });
  };

  const removeIngredientHandler = (ingredientId) => {
    setIngredients(prevIngredients => [
      ...prevIngredients.filter(i => i.id !== ingredientId)
    ])
  };

  return (
    <div className="App">
      <IngredientForm onSubmit={addIngredientHandler}/>

      <section>
        <Search onSearchResults={searchChangeHandler}/>
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
