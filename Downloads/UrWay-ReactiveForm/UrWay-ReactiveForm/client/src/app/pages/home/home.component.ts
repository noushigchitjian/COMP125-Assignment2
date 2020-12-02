import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SurveyModel } from '../../model/survey.model';
import { BasePageComponent } from '../../partials/base-page/base-page.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BasePageComponent implements OnInit {
  title= "Home";
  activeSurveys: SurveyModel[] = [];
  constructor(route: ActivatedRoute, private http: HttpClient, private router: Router) {
    super(route);
  }

  ngOnInit(): void {
    this.onGetData();
  }

  onGetData()
  {console.log("Fetching Active Surveys...");
    this.http.get<{message:string, survey: SurveyModel[]}>('http://localhost:4000/surveys/active/').subscribe(getData => {
      let date = new Date;
      let dateToday = this.toInputDate(date.toISOString());
      let temporaryStorage = getData.survey;
      console.log(getData.message);
      for(let i =0; i < temporaryStorage.length; i++)
      {
        let tempStart = this.toInputDate(temporaryStorage[i].dateActiveStart);
        let tempEnd = this.toInputDate(temporaryStorage[i].dateActiveEnd);
        if(tempStart <= dateToday && tempEnd >= dateToday)
        {
          this.activeSurveys.push(temporaryStorage[i]);
        }
      }
    });
  }
  onParticipate(id: string)
  {
    this.router.navigate(['/participate/' + id]);
  }
  toInputDate(date: any)
  {
    return(date.toLocaleString().split("T")[0]);
  }
}
