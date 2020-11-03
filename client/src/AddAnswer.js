import React, { useState, useEffect } from 'react';

function AddAnswer(props) {
  const [answerText, setAnswerText] = useState('');

  return (
    <>
      <h2>Answer</h2>
      <input
        onChange={(event) => setAnswerText(event.target.value)}
        type='text'
        placeholder='answerText'
      />

      <button
        type='button'
        onClick={(event) => props.addAnswer(answerText, props.questionId)}
      >
        Submit
      </button>
    </>
  );
}

export default AddAnswer;
