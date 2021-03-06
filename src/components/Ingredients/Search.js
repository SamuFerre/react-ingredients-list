import React,{useState, useEffect, useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const {onLoadIngredients} = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query = 
        enteredFilter.length === 0 
        ? '' 
        : `?orderBy="title"&equalTo="${enteredFilter}"`;
      fetch('https://react-http-25c91-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json' + query)
        .then(response => response.json())
        .then(responseData => {
          const loadingIngredients = [];
          for (const key in responseData) {
          loadingIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount
            });
          }
          onLoadIngredients(loadingIngredients);
        }); 
      }
    }, 500);   
    return () => {
      clearTimeout(timer);
    };   
  }, [enteredFilter, onLoadIngredients, inputRef])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input 
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={event => setEnteredFilter(event.target.value)} 
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
