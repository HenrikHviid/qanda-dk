import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';

import AddAnswer from './AddAnswer';

function Question(props) {
  const [questionState, setQuestion] = useState();
  useEffect(() => {
    async function initData() {
      let newQuestion = await props.getQuestion(id);
      setQuestion(newQuestion);
      console.log(questionState);
    }
    initData();
  }, []);

  const id = props.id;
  // const question = props.getQuestion(id);

  let qHeadline = 'Loading Question';
  let qDescription = '';
  let qAnswers = [];
  let addAnswer = <p>Posting Functionality not loaded</p>;
  let list;

  if (questionState) {
    qHeadline = questionState.headline;
    qDescription = questionState.description;
    qAnswers = questionState.answers;
    addAnswer = (
      <>
        {' '}
        <AddAnswer
          addAnswer={props.addAnswer}
          questionId={questionState._id}
        ></AddAnswer>
      </>
    );
    //onst listItems = data.map((d) => <li key={d.name}>{d.name}</li>);
    //qAnswers = questionState.Answers(mapFunction);
  }

  return (
    <>
      <h3>{qHeadline}</h3>
      <p>{qDescription}</p>
      {addAnswer}
      <ul>
        {qAnswers.map((e) => (
          <li key={e._id}>
            {e.text}
            {e.score}
            <button onClick={() => props.incrScore(id, e._id)}>Like</button>
          </li>
        ))}
      </ul>

      <Link to='/'>Back</Link>
    </>
  );
}

export default Question;
