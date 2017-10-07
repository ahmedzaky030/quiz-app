import { Injectable } from '@angular/core';
import {Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class SchoolService  {
  schools : Array<any>;
  departments: Array<any>;
  quizzes:Array<any>;




  constructor(private _http : Http) { }

  GetSchools() {
    return this._http.get('api/schools/').map(x => x.json());
  }

  GetDepartmentsBySchool(schoolId: number) {
    return this._http.get('/api/departments').map(x => x.json().filter(dept => dept.schoolsId.indexOf(schoolId) > -1));
  }

  GetQuizzesByDepartment(deptId: number) {
    return this._http.get('/api/quizzes').map(x => x.json().filter(quiz => quiz.departmentsId.indexOf(deptId) > -1));
  }

  GetQuiz(quizId:number) {
    return this._http.get('api/quizzes/?Id='+quizId).map(x => x.json());
  }



}
