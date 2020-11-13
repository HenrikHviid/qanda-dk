import React, { useState, useEffect } from 'react';
import { Router } from '@reach/router';

import Questions from './Questions';
import Question from './Question';

const API_URL = process.env.REACT_APP_API || 'http://localhost:8080/api';

function App() {
  const [questions, setQuestions] = useState([]);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const url = `${API_URL}/questions`;
      const response = await fetch(url);
      const data = await response.json();
      setQuestions(data);
    }
    fetchData();
    //console.log('test');
  }, [postCount]);

  async function getQuestion(id) {
    const url = `${API_URL}/question/${id}`;
    const response = await fetch(url);
    const questionObject = await response.json();
    return questionObject;
  }

  function addQuestion(headline, description) {
    fetch(`${API_URL}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        headline: headline,
        description: description,
      }),
    });
  }

  function addAnswer(answerText, id) {
    fetch(`${API_URL}/question/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answerText: answerText,
      }),
    });
    setPostCount(postCount + 1);
  }

  function incrScore(qId, aId) {
    const url = `${API_URL}/question/increase/${qId}/${aId}`;
    console.log('incrScore');
    fetch(url, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('succes' + data);
      });
    setPostCount(postCount + 1);
  }

  return (
    <>
      <h1>Qanda App!</h1>
      <Router>
        <Questions path='/' questions={questions} addQuestion={addQuestion} />
        <Question
          path='/question/:id'
          getQuestion={getQuestion}
          addAnswer={addAnswer}
          incrScore={incrScore}
        />
      </Router>
    </>
  );
}

export default App;
