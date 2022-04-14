import React, {useCallback, useState} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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
      })
      .catch(error => {
        setError(error.message);
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
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const clearError = () => setError(null);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

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
