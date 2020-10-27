import React from 'react';
import { Link } from '@reach/router';

import AddQuestion from './AddQuestion';

function Questions(props) {
  let questions = props.questions;
  const filter = props.filter;

  console.log('filter', filter);

  const mapFunction = (element) => (
    <Link to={`/question/${element.id}`} key={element.id}>
      <li>{element.headline}</li>
    </Link>
  );

  const list = questions.map(mapFunction);

  return (
    <>
      <AddQuestion></AddQuestion>
      <h2>Questions</h2>

      <ul>{list}</ul>
    </>
  );
}

export default Questions;
