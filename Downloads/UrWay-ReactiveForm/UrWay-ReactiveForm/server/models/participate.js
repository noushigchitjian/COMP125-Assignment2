let mongoose = require('mongoose');

let participateModel = mongoose.Schema({
    dateCreated: Date,
  username: String,
  surveyID: String,
  surveyTitle: String,
  surveyDescription: String,
  questionAndAnswer: [{
      question: String,
      answer: String,
  }]
},
{
    collection: "participate"
});
module.exports = mongoose.model('Participate', participateModel);
