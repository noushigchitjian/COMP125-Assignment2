export interface SurveyModel
{
  _id?: string,
  username?: string,
  dateCreated?: Date,
  dateLastModified?: Date,
  dateActiveStart?: Date,
  dateActiveEnd?: Date,
  isActive?: Boolean,
  surveyTitle?: string,
  surveyDescription?: string,
  questionsDetail?: [{
  questionType?:string,
  question?: string,
  choices?: string[]
       }]
}
