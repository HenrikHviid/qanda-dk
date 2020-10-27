import React from 'react';
import { Link } from '@reach/router';

function Question(props) {
  const id = props.id;
  const question = props.getQuestion(id);
}

let list = question.answers.map((answer) => <li key={}></li>);
