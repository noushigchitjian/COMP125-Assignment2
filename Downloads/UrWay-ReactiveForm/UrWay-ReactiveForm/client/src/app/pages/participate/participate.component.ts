import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParticipateModel } from 'src/app/model/participate.model';
import { QuestionAndAnswerModel } from 'src/app/model/questionAndAnswer.model';
import { SurveyModel } from 'src/app/model/survey.model';
import { SurveysComponent } from '../surveys/surveys.component';

@Component({
  selector: 'app-participate',
  templateUrl: './participate.component.html',
  styleUrls: ['./participate.component.css']
})
export class ParticipateComponent implements OnInit {

  showHint: boolean = false;
  participateID: string = null;
  participateSurvey: SurveyModel = {};
  answer: string[] = [];
  toSend: ParticipateModel = {};

  qna: QuestionAndAnswerModel[] = [];
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=> {
        this.participateID = params['id'];
      });
      this.getSurvey();
  }
  getSurvey()
  {
    this.http.get<{message:string, survey: SurveyModel}>('http://localhost:4000/surveys/active/' + this.participateID).subscribe(getData => {
      this.participateSurvey = getData.survey;
      console.log(getData.message);
    });
  }

  onSubmit()
  {
    let isempty = true;
    for(let i = 0; i<this.answer.length; i++)
    {
      if(this.answer[i] == null)
      {
        isempty = true;
        this.showHint = true;
        break;
      }
      isempty = false;
    }if(this.participateSurvey.questionsDetail.length == this.answer.length && !isempty)
    {
      this.toSend.username = this.participateSurvey.username;
      this.toSend.dateCreated = new Date,
      this.toSend.surveyID = this.participateSurvey._id;
      this.toSend.surveyTitle = this.participateSurvey.surveyTitle;
      this.toSend.surveyDescription = this.participateSurvey.surveyDescription;
      for(let i=0; i < this.participateSurvey.questionsDetail.length; i++)
      {
        this.qna.push({question: this.participateSurvey.questionsDetail[i].question, answer: this.answer[i]});
      }
      this.toSend.questionAndAnswer = this.qna;
      //console.log(this.toSend);
      this.http.post<{message: string}>('http://localhost:4000/participate/post', this.toSend).subscribe((response) => {console.log(response.message)});
      this.router.navigate(['/home']);
    }
    else
    {
      this.showHint = true;
    }
  }
}
