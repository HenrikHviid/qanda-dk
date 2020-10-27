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
    let headline = req.body.headline;
    let description = req.body.description;
    const q = await questionDB.createQuestion(headline, description);
    if (q) {
      res.send('Question added succesfully');
    } else {
      res.send('Error question could not be added');
    }
  });

  return router;
};
