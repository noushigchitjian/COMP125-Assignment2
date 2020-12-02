import { Component, OnInit, OnChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BasePageComponent } from 'src/app/partials/base-page/base-page.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormatWidth } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SurveyModel } from '../../model/survey.model'
import { MatExpansionModule } from '@angular/material/expansion';
import { PassDataService } from 'src/app/Services/passData.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [PassDataService, AuthService]
})
export class CreateComponent implements OnInit {s
  surveyToEdit: any;
  isTouched = false;
  username: string = localStorage.getItem("username");
  surveyForm: FormGroup =  new FormGroup({
    username: new FormControl(this.username, Validators.required),
    dateCreate: new FormControl(new Date),
    dateLastModified: new FormControl(new Date),
    dateActiveStart: new FormControl(new Date),
    dateActiveEnd: new FormControl(new Date),
    isActive: new FormControl(false),
    surveyTitle: new FormControl(null, Validators.required),
    surveyDescription: new FormControl(null, Validators.required),
    questionsDetail: new FormArray([new FormGroup({
      questionType: new FormControl(null, Validators.required),
      question: new FormControl(null, Validators.required),
      choices: new FormArray([new FormControl(null, Validators.required)])
    })])
  });
  buttonName: string = 'Create';
  editID: string;
  editSurveyTitle: string;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {
   }
   ngOnInit(): void {
     this.username = this.authService.getAuthdata().username;
      this.route.params.subscribe(
       (params: Params)=> {
         this.editID = params['id'];
       }
     );
     if(this.editID != undefined)
     {
     this.getEditData();
    }

    };
      getEditData()
    {
      console.log("Fetching Data to Edit...");
      this.http.get<{message:string, survey: SurveyModel}>('http://localhost:4000/surveys/edit/' + this.editID).subscribe(getData => {
      this.surveyToEdit = getData.survey;
      console.log(getData.message);
        this.buttonName = "Edit";
        this.surveyForm
            this.surveyForm =  new FormGroup({
              surveyTitle: new FormControl(this.surveyToEdit.surveyTitle),
              surveyDescription: new FormControl(this.surveyToEdit.surveyDescription),
              questionsDetail: new FormArray([new FormGroup({
                questionType: new FormControl(),
                question: new FormControl(),
                choices: new FormArray([])
              })])
            });
            for(let i=0; i < this.surveyToEdit.questionsDetail.length; i ++)
            {
              let editChoice = this.formBuilder.array([]);
              const control = new FormGroup({
                'questionType': new FormControl(this.surveyToEdit.questionsDetail[i].questionType, Validators.required),
                'question': new FormControl(this.surveyToEdit.questionsDetail[i].question, Validators.required),
                'choices': editChoice
              });
              for(let a=0; a<this.surveyToEdit.questionsDetail[i].choices.length; a++)
              {
              editChoice.push(new FormControl(this.surveyToEdit.questionsDetail[i].choices[a], Validators.required));
              }

              (this.surveyForm.get('questionsDetail') as FormArray).push(control);
              if(this.surveyToEdit.questionsDetail[i].questionType === "saq" || this.surveyToEdit.questionsDetail[i].questionType === "tof")
                {
                  (this.questionsDetailcontrols.at(i+1).get('choices') as FormArray).disable();
                }
            }

            this.questionsDetailcontrols.removeAt(0);
      });
    }

  onSubmit()
  {
    this.isTouched = true;
    if(this.surveyForm.valid)
    {
      if(this.buttonName === "Create")
      {
      console.log("Saving to Database...");
      this.http.post<{message: string}>('http://localhost:4000/surveys/create-mcq', this.surveyForm.getRawValue()).subscribe((response) => {console.log(response.message)});
      this.router.navigate(['/surveys']);
      }
      else
      {
        console.log("Updating Database...");
        this.http.post<{message: string}>('http://localhost:4000/surveys/edit/' + this.editID, this.surveyForm.getRawValue()).subscribe((response) => {console.log(response.message)});
        this.router.navigate(['/surveys']);
      }
    }
    /*this.formTemplete = this.surveyForm.value;
    this.http.post('https://urway-survey.firebaseio.com/surveys.json', this.formTemplete).subscribe(response=>{console.log(response)});*/
  }

  onAddChoices(index: number)
  {
    (this.questionsDetailcontrols.at(index).get('choices') as FormArray).push(new FormControl(null, Validators.required));
  }
  onAddQuestion()
  {
    const control = new FormGroup({
      'questionType': new FormControl(null, Validators.required),
      'question': new FormControl(null, Validators.required),
      'choices': this.formBuilder.array([new FormControl(null, Validators.required)])
    });
    (this.surveyForm.get('questionsDetail') as FormArray).push(control);
  }
  get questionsDetailcontrols() {
    return (this.surveyForm.get('questionsDetail') as FormArray);
  }
  getChoicesControl(index: number)
  {
    return (this.questionsDetailcontrols.at(index).get('choices') as FormArray).controls;
  }
  hideChoices(index: number)
  {
    if(this.questionsDetailcontrols.at(index).get('questionType')?.value === 'mcq')
    {
      return false;
    }
    else
    {
      return true;
    }
  }
  onRemoveChoice(group: number, index: number)
  {
    (this.questionsDetailcontrols.at(group).get('choices') as FormArray).removeAt(index);
  }
  onRemoveQuestion(index: number)
  {
    this.questionsDetailcontrols.removeAt(index);
  }
  removeElements(index: number)
  {
    const length = (this.questionsDetailcontrols.at(index).get('choices') as FormArray).controls.length;
    for(let i=0; i < length; i++)
    {
      (this.questionsDetailcontrols.at(index).get('choices') as FormArray).removeAt(i);
    }
    if(this.questionsDetailcontrols.at(index).get('questionType')?.value ==='mcq')
    {
      for(let i=0; i < length; i++)
      {
        (this.questionsDetailcontrols.at(index).get('choices') as FormArray).removeAt(i);
      }
      (this.questionsDetailcontrols.at(index).get('choices') as FormArray).push(new FormControl(null, Validators.required));
      (this.questionsDetailcontrols.at(index).get('choices') as FormArray).push(new FormControl(null, Validators.required));
    }
    else if(this.questionsDetailcontrols.at(index).get('questionType')?.value ==='tof')
    {
      for(let i=0; i < length; i++)
      {
        (this.questionsDetailcontrols.at(index).get('choices') as FormArray).removeAt(i);
      }
      (this.questionsDetailcontrols.at(index).get('choices') as FormArray).push(new FormControl('True', Validators.required));
      (this.questionsDetailcontrols.at(index).get('choices') as FormArray).push(new FormControl('False', [Validators.required]));
      (this.questionsDetailcontrols.at(index).get('choices') as FormArray).disable();
    }
    else if(this.questionsDetailcontrols.at(index).get('questionType')?.value ==='saq')
    {
      for(let i=0; i < length; i++)
      {
        (this.questionsDetailcontrols.at(index).get('choices') as FormArray).removeAt(i);
      }
      (this.questionsDetailcontrols.at(index).get('choices') as FormArray).push(new FormControl('Answer Here', Validators.required));
      (this.questionsDetailcontrols.at(index).get('choices') as FormArray).disable();
    }
  }
  onReset()
  {
    this.isTouched = false;
    this.surveyForm.reset();
    for(let i = 0; i < this.questionsDetailcontrols.length; i++)
    {
      if(i != 0)
      {
        this.questionsDetailcontrols.removeAt(i);
      }
    }
  }
  onCancel()
  {
    if(confirm("Are you sure?"))
    {
      this.router.navigate(['/surveys']);
    }
  }
}
