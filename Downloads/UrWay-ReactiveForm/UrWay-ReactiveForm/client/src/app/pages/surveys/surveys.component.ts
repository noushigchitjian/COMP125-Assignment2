import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { BasePageComponent } from 'src/app/partials/base-page/base-page.component';
import { PassDataService } from 'src/app/Services/passData.service';
import { SurveyModel } from '../../model/survey.model';
import { AuthService } from '../auth/auth.service';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css'],
  providers:[PassDataService]
})
export class SurveysComponent extends BasePageComponent implements OnInit {

  isActivated: boolean[] = [];
  buttonName: string[] = [];
  surveyCollection: SurveyModel[] = [];
  username: string;
  private updatedCollection = new Subject<SurveyModel[]>();
  constructor(route: ActivatedRoute, private http: HttpClient, private router: Router, private passData: PassDataService, private authService: AuthService) {
    super(route); }
  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    this.onGetData();
  }
  onGetData()
  {console.log("Fetching All Data...");
    this.http.get<{message:string, survey: SurveyModel[]}>('http://localhost:4000/surveys/authenticated/' + this.username).subscribe(getData => {
      this.surveyCollection = getData.survey;
      console.log(getData.message);
      //console.log(this.toInputDate(this.surveyCollection[0].dateActiveStart.toLocaleString()));
      //console.log(this.surveyCollection)
      for(let i = 0; i < this.surveyCollection.length; i++)
      {
        if(this.surveyCollection[i].isActive)
        {
          this.buttonName.push("Deactivate");
          this.isActivated.push(true);
        }
        else
        {
          this.isActivated.push(false);
          this.buttonName.push("Activate");
        }
      }
    });
  }
  onDeleteSurvey(id: string)
  {
    if(confirm("Are you sure?"))
    {
    console.log("Deleting Survey...");

    this.http.get<{message: string}>('http://localhost:4000/surveys/delete/' + id).subscribe((Response) => {
      const updatedSurvey = this.surveyCollection.filter(survey => survey._id !== id);
      this.surveyCollection = updatedSurvey;

        this.updatedCollection.next([...updatedSurvey]);

      console.log(Response.message);
     });
    }
  }
  onEdit(id: string)
  {
    this.router.navigate(['/surveys/edit/' +id]);
  }
  onActivate(survey: SurveyModel, index: number, dateStart: any, dateEnd: any)
  {
    let date = new Date;
    let dateToday = this.toInputDate(date.toISOString());

    if(dateStart <= dateEnd && dateStart >= dateToday)
    {
      let toDateStart = (dateStart + "T00:00:00.001+00:00");
      let toDateEnd = (dateEnd + "T23:59:59.999+00:00");
      if(confirm("Are you sure?"))
      {
        survey.isActive = !survey.isActive;
        let isActived = survey.isActive;
        if(survey.isActive)
        {
          this.isActivated[index] = true;
          this.buttonName[index]="Deactivate";
        }
        else
        {
          this.isActivated[index] = false;
          this.buttonName[index]="Activate";
        }
      this.http.post<{message: string}>('http://localhost:4000/surveys/edit/' + survey._id, {isActive: isActived, dateActiveStart: toDateStart, dateActiveEnd: toDateEnd}).subscribe((response) => {console.log(response.message)});
      }
    }
    else
    {
      alert('Start Date Should not be less than today and not greater than End Date.');
    }

  }
  toInputDate(date: any)
  {
    return(date.toLocaleString().split("T")[0]);
  }
}

