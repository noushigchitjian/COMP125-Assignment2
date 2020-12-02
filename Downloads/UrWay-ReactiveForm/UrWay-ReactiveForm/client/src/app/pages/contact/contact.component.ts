import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SurveyModel } from 'src/app/model/survey.model';
import { BasePageComponent } from 'src/app/partials/base-page/base-page.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent extends BasePageComponent implements OnInit {

  surveyForm: FormGroup;
  /*formTemplete : {
    surveyTitle: string,
       surveyDescription: string,
       questionsDetail: [{
        questionType:string,
        question: string,
        choices: string[]
       }]
  };*/
  surveyCollection: SurveyModel[] = [];

  constructor(route: ActivatedRoute) {
    super(route);
   }
   ngOnInit(): void {

    };
  }
