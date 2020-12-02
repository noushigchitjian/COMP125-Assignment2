let mongoose = require('mongoose');

// create a model class
/* let surveyModel = mongoose.Schema({
    username: String,
    surveyID: Number,
    surveyTitle: String,
    description: String,
    questionType: String,
    questions: [String],
    answers: [[String]]
},
{
    collection: "surveys03"
}); */

let surveyModel = mongoose.Schema({
    username: String,
    dateCreate: Date,
    dateLastModified: Date,
    dateActiveStart: Date,
    dateActiveEnd: Date,
    isActive: Boolean,
    surveyTitle: String,
       surveyDescription: String,
       questionsDetail: [{
        questionType: String,
        question: String,
        choices: [String]
       }]
},
{
    collection: "surveys"
});
module.exports = mongoose.model('Survey', surveyModel);
