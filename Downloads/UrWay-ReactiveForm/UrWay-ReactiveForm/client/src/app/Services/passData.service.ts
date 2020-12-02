import { Injectable, Input } from '@angular/core';

@Injectable()
export class PassDataService
{
  @Input() private surveyData: string;

  setSurveyData(dataSet: string)
  {
    this.surveyData = dataSet;
  }
  getSurveyData() :string
  {
    return this.surveyData;
  }
}
