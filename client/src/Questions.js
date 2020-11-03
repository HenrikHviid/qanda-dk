import React from 'react';
import { Link } from '@reach/router';

import AddQuestion from './AddQuestion';

function Questions(props) {
  let questions = props.questions;

  const mapFunction = (element) => (
    <Link to={`/question/${element._id}`} key={element._id}>
      <li>{element.headline}</li>
    </Link>
  );

  let list = [];
  list = questions.map(mapFunction);

  return (
    <>
      <AddQuestion addQuestion={props.addQuestion}></AddQuestion>
      <h2>Questions</h2>
      <ul>{list}</ul>
    </>
  );
}

export default Questions;
