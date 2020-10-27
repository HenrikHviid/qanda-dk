import React, { useState, useEffect } from 'react';

function AddQuestion(props) {
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');

  return (
    <>
      <h2>Ask a Question</h2>

      <input
        onChange={(event) => setHeadline(event.target.value)}
        type='text'
        placeholder='Headline'
      />
      <input
        onChange={(event) => setDescription(event.target.value)}
        type='text'
        placeholder='Description'
      />

      <button
        type='button'
        onClick={(event) => props.addQuestion(headline, description)}
      >
        Submit
      </button>
    </>
  );
}

export default AddQuestion;
