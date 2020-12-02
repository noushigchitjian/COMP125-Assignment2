let express = require('express');
const { data } = require('jquery');

let Survey = require('../models/survey');
const checkAuth = require('../controllers/check-auth');

module.exports.displaySurveysPage = (req, res, next) => {
    let username = req.params.username;
    Survey.find({username: username}, (err, data) => {
        if(err)
        {
            console.error(err);
            res.end();
        }
    res.status(200).json({message: "Fetch All Successful", survey: data});
    });
}

module.exports.displayParticipateSurveyPage = (req, res, next) => {
     let id = req.params.id;
    Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
          console.log(err);
          res.end();
        } 
        res.json({message: 'Fetch Survey to Participate Successful', survey: surveyToEdit});
       });
}

module.exports.displayActiveSurveysPage = (req, res, next) => {
    Survey.find({isActive: true}, (err, data) => {
        if(err)
        {
            console.error(err);
            res.end();
        }
    res.status(200).json({message: "Fetching All Active Surveys Successful", survey: data
});
    });
}

// MCQ SURVEY Create and Read
module.exports.displayCreatePage = (req, res, next) => {
    res.render('create', {title: 'Create Multiple Choices Questions Survey', surveys: '', buttonName: 'Create', type:'mcq'});
}

module.exports.processCreatePage = (req, res, next) => {
    res.json({message: "Create Successful"});
    Survey.create(req.body);
}

// Short SURVEY Create and Read 
module.exports.displayCreateShortPage = (req, res, next) => {
    res.render('create', {title: 'Create Short Answer Survey', surveys: '', buttonName: 'Create', type: 'sa'});
}

module.exports.processCreateShortPage = (req, res, next) => {
    
    Survey.create({
        username: req.body.username,
        surveyID: req.body.surveyID,
        surveyTitle: req.body.surveyTitle,
        description: req.body.description,
        questionType: req.body.questionType,
        questions: req.body.questions,
        answers: [req.body.q1, req.body.q2, req.body.q3, req.body.q4, req.body.q5]
    },
    (err, survey) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        res.redirect('/surveys');
    });
}

// True or False SURVEY Create and Read 
module.exports.displayCreateTruePage = (req, res, next) => {
    res.render('create', {title: 'Create True or False Survey', surveys: '', buttonName: 'Create', type: 'tof'});
}

module.exports.processCreateTruePage = (req, res, next) => {
   
    Survey.create({
        username: req.body.username,
        surveyID: req.body.surveyID,
        surveyTitle: req.body.surveyTitle,
        description: req.body.description,
        questionType: req.body.questionType,
        questions: req.body.questions,
        answers: [req.body.q1, req.body.q2, req.body.q3, req.body.q4, req.body.q5]
    },
    (err, survey) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        res.redirect('/surveys');
    });
}

// Read and Update for Edit Page
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
          console.log(err);
          res.end();
        }
        res.json({message: 'Fetch to Edit Successful', survey: surveyToEdit});
      }); 
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    Survey.updateOne(
      {_id:id}, req.body,
      (err) =>
      {
        console.log(err);
        res.end();
      }); 
      res.json({message: "Update Successful"});
}


// Read and Update for Participate Page
module.exports.displayParticipatePage = (req, res, next) => {
    let id = req.params.id;
    Survey.findById(id, (err, surveyToEdit) => {
        console.log(surveyToEdit.answers);
        if(err)
        {
          console.log(err);
          res.end();
        }
        res.render('participate', {title:'Participate', surveys:surveyToEdit})
      });
}

module.exports.processParticapatePage = (req, res, next) => {
    console.log({
        "Title": req.body.surveyTitle,
        "Question 1":req.body.questions[0],
        "Answer to Question 1":req.body.q1,
        "Question 2":req.body.questions[1],
        "Answer to Question 2":req.body.q2,
        "Question 3":req.body.questions[2],
        "Answer to Question 3":req.body.q3,
        "Question 4":req.body.questions[3],
        "Answer to Question 4":req.body.q4,
        "Question 5":req.body.questions[4],
        "Answer to Question 5":req.body.q5,
    });
    res.redirect('/home');
}


module.exports.processDeletePage = (req, res, next) => {
    let id = req.params.id;
    Survey.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        res.json({message: "Survey Deleted..."})
    });
}