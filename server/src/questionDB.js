module.exports = (mongoose) => {
  const questionSchema = new mongoose.Schema({
    headline: String,
    description: String,
    answers: [{ text: String, score: Number }],
  });

  const questionModel = mongoose.model('question', questionSchema);

  async function getQuestions() {
    try {
      return await questionModel.find();
    } catch (error) {
      console.error('getQuestion:', error.message);
      return {};
    }
  }

  async function getQuestion(id) {
    try {
      return await questionModel.findById(id);
    } catch (error) {
      console.error('getQuestion:', error.message);
      return {};
    }
  }

  async function createQuestion(headline, description) {
    let question = new questionModel({
      headline: headline,
      description: description,
      answers: [],
    });
    return question.save();
  }

  async function createAnswer(id, answerText) {
    console.log('id:' + id + answerText);
    let obj = { text: answerText, score: 0 };
    return await questionModel.findOneAndUpdate(
      { _id: id },
      { $push: { answers: obj } }
    );
  }

  async function incrScore(qId, aId) {
    console.log('qId: ' + qId + 'aId: ' + aId);
    return await questionModel.update(
      { _id: qId, 'answers._id': aId },
      { $inc: { 'answers.$.score': 1 } },
      { new: true }
    );
  }

  async function bootstrap(count = 10) {
    let l = (await getQuestions()).length;
    console.log('Question collection size:', l);

    if (l === 0) {
      let promises = [];
      for (let i = 0; i < count; i++) {
        let newQuestion = new questionModel({
          headline: `Question number ${i}`,
          description: `test description`,
          answers: [],
        });
        promises.push(newQuestion.save());
      }
      return Promise.all(promises);
    }
  }

  return {
    getQuestions,
    getQuestion,
    createQuestion,
    bootstrap,
    createAnswer,
    incrScore,
  };
};
