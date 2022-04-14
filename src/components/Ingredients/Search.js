import React, {useEffect, useRef, useState} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onSearchResults } = props;
  const [searchText, setSearchText] = useState('');
  const searchTextRef = useRef();

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchText === searchTextRef.current.value) {
        const queryString = searchText === '' ?
          '' :
          `?orderBy="title"&equalTo="${searchText}"`;

        fetch('https://react-complete-hooks-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json' + queryString)
          .then(resp => resp.json())
          .then(data => {
            const ingredients = [];
            for (const key in data) {
              ingredients.push({
                id: key,
                title: data[key].title,
                amount: data[key].amount
              });
            }
            onSearchResults(ingredients);
          });
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchText, onSearchResults, searchTextRef]);

  const changeSearchTextHandler = e => {
    setSearchText(e.target.value);
  };

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={searchTextRef} value={searchText} onChange={changeSearchTextHandler} type="text" />
        </div>
      </Card>
    </section>
  );
});

export default Search;
