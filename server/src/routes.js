module.exports = (questionDB) => {
  const express = require('express');
  const router = express.Router();

  /**** Routes ****/
  router.get('/questions', async (req, res) => {
    const questions = await questionDB.getQuestions();
    res.json(questions);
  });

  router.get('/question/:id', async (req, res) => {
    const question = await questionDB.getQuestion(req.params.id);
    res.json(question);
  });

  router.post('/questions', async (req, res) => {
    let headline = req.body.headline;
    let description = req.body.description;
    const q = await questionDB.createQuestion(headline, description);
    if (q) {
      res.send('Question added succesfully');
    } else {
      res.send('Error question could not be added');
    }
  });

  router.post('/question/:id', async (req, res) => {
    let answerText = req.body.answerText;
    const answer = await questionDB.createAnswer(req.params.id, answerText);
    if (answer) {
      res.send('Answer sent succesfully');
    } else {
      res.send('Error Answer not added');
    }
  });

  router.post('/question/increase/:qId/:aId', async (req, res) => {
    const answer = await questionDB.incrScore(req.params.qId, req.params.aId);
    if (answer) {
      res.send('Upvoted Answer');
    } else {
      res.send('Error could not upvote');
    }
  });

  return router;
};
