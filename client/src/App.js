import React, { useState, useEffect } from 'react';
import { Router } from '@reach/router';

import Questions from './Questions';

const API_URL = process.env.REACT_APP_API || 'http://localhost:8080/api';

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const url = `${API_URL}/questions`;
      const response = await fetch(url);
      const question = await response.json();
      setQuestions(question);
    }
    fetchData();
  }, []);

  function getQuestion(id) {
    const question = questions.find((element) => element.id === parseInt(id));
    return question;
  }

  async function addQuestion(headline, description) {
    const newQuestion = {
      headline: headline,
      description: description,
    };

    const url = 'API_URL';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(newQuestion),
    });
    const question = await response.json();
    console.log(question);
  }

  return (
    <>
      <h1>Qanda App!</h1>
      <Router>
        <Questions path='/' questions={questions} addQuestion={addQuestion} />
      </Router>
    </>
  );
}

export default App;
