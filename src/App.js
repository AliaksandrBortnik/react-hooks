import React, {useContext} from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth';
import {AuthContext} from './store/AuthContext';

const App = props => {
  const {isLoggedIn} = useContext(AuthContext);
  return (
    <>
      {isLoggedIn ?
        <Ingredients /> :
        <Auth/>
      }
    </>
  );
};

export default App;
