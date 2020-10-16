module.exports = (mongoose) => {
  const questionSchema = new mongoose.Schema({
    headline: String,
    description: String,
    answer: [{ text: String, score: Number }],
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
      answer: [],
      score: 0,
    });
    return question.save();
  }

  async function bootstrap(count = 10) {
    let l = (await getQuestions()).length;
    console.log('Question collection size:', l);

    if (l === 0) {
      let promises = [];
      for (let i = 0; i < count; i++) {
        let newQuestion = new questionModel({ name: `Question number ${i}` });
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
  };
};
