import React, {useCallback, useState} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchChangeHandler = useCallback((ingredients) => {
    setIngredients(ingredients);
  }, []);

  const addIngredientHandler = (ingredient) => {
    setIsLoading(true);

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
        setIsLoading(false);
      });
  };

  const removeIngredientHandler = (ingredientId) => {
    setIsLoading(true);

    fetch(`https://react-complete-hooks-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${ingredientId}.json`,{
      method: 'DELETE'
    })
      .then(_ => {
        setIngredients(prevIngredients =>
          prevIngredients.filter(i => i.id !== ingredientId)
        );
        setIsLoading(false);
      });
  };

  return (
    <div className="App">
      <IngredientForm onSubmit={addIngredientHandler} isLoading={isLoading}/>

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
