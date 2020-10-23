module.exports = (questionDB) => {
  const express = require('express');
  const router = express.Router();

  /**** Routes ****/
  router.get('/', async (req, res) => {
    const questions = await questionDB.getQuestions();
    res.json(questions);
  });

  router.get('/:id', async (req, res) => {
    const question = await questionDB.getQuestion(req.params.id);
    res.json(question);
  });

  router.post('/', async (req, res) => {
    let headline = new headline(req.body);
    let description = new description(req.body);
    const q = await questionDB.createQuestion(headline, description);
    q.save();
    .then( q => {
      res.status(200).send{('Question added succesfully')};
    })
    .catch( error => {
      res.status(400).send{('Error question could not be added')}
    })
  });

  return router;
};
