import React, {useCallback, useReducer, useState} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';

const ingredientReducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_RESULT':
      return {
        ...state,
        ingredients: action.ingredients
      };
    case 'START_LOADING':
      return {
        ...state,
        isLoading: true
      };
    case 'ERROR_OCCURIED':
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    case 'ADD_INGREDIENT':
      return {
        ingredients: [...state.ingredients, action.ingredient],
        error: null,
        isLoading: false
      };
    case 'DELETE_INGREDIENT':
      return {
        ingredients: state.ingredients.filter(i => i.id !== action.ingredientId),
        error: null,
        isLoading: false
      };
    case 'CLEAR_ERROR':
      return {
        ingredients: state.ingredients,
        error: null,
        isLoading: false
      }
    default:
      return state;
  }
};

function Ingredients() {
  // const [ingredients, setIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  const [state, dispatch] = useReducer(ingredientReducer, {
    ingredients: [],
    isLoading: false,
    error: null
  });

  const searchChangeHandler = useCallback((ingredients) => {
    // setIngredients(ingredients);
    dispatch({ type: 'SEARCH_RESULT', ingredients });
  }, []);

  const addIngredientHandler = (ingredient) => {
    // setIsLoading(true);
    dispatch({ type: 'START_LOADING' });

    fetch('https://react-complete-hooks-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json',{
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((resp) => resp.json())
      .then(data => {
        // setIngredients(prevState => [
        //   ...prevState,
        //   { id: data.name, ...ingredient }
        // ]);
        // setIsLoading(false);
        dispatch({
          type: 'ADD_INGREDIENT',
          ingredient: { id: data.name, ...ingredient }
        });
      })
      .catch(error => {
        // setError(error.message);
        // setIsLoading(false);
        dispatch({ type: 'ERROR_OCCURIED', error: error.message })
      });
  };

  const removeIngredientHandler = (ingredientId) => {
    // setIsLoading(true);
    dispatch({ type: 'START_LOADING' });

    fetch(`https://react-complete-hooks-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${ingredientId}.json`,{
      method: 'DELETE'
    })
      .then(_ => {
        // setIngredients(prevIngredients =>
        //   prevIngredients.filter(i => i.id !== ingredientId)
        // );
        // setIsLoading(false);
        dispatch({ type: 'DELETE_INGREDIENT', ingredientId });
      })
      .catch(error => {
        // setError(error.message);
        // setIsLoading(false);
        dispatch({ type: 'ERROR_OCCURIED', error: error.message })
      });
  };

  // const clearError = () => setError(null);
  const clearError = () => dispatch({ type: 'CLEAR_ERROR' });

  return (
    <div className="App">
      {state.error && <ErrorModal onClose={clearError}>{state.error}</ErrorModal>}

      <IngredientForm onSubmit={addIngredientHandler} isLoading={state.isLoading}/>

      <section>
        <Search onSearchResults={searchChangeHandler}/>
        <IngredientList
          ingredients={state.ingredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
