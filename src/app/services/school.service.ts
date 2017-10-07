import { Injectable } from '@angular/core';
import {Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class SchoolService  {
  schools : Array<any>;
  departments: Array<any>;
  quizzes:Array<any>;


//    schools : Array<any> = [ {"name":"SchoolA","Id":1} ,
//   {"name":"School B","Id":2},
//   {"name":"School C", "Id":3},
//    ];
//   departments: Array<any> = [
//   { "name":"Maths", "schoolsId":[1, 2 , 3] , "Id":101 },
//   { "name":"Physics", "schoolsId":[1 ,3] , "Id":102 },
//   { "name":"Art", "schoolsId":[2 , 3] , "Id":103 },
//   { "name":"Chemistry", "schoolsId":[1 , 2 ] , "Id":104 },
//   { "name":"Sport", "schoolsId":[1 , 3] , "Id":105 },
//   { "name":"Languages", "schoolsId":[1 , 2 ] , "Id":106 },
//   { "name":"Culture", "schoolsId":[ 1 , 2  ,3] , "Id":107 }
// ];

// quizzes:Array<any> = [
//   {"name":"Quiz1", "departmentsId":[101 , 102 , 103 , 104], "Id":501 ,
//          "quizzesTypes":["text","text", "number", "checkbox"]},
//   {"name":"Quiz2", "departmentsId":[105 , 106 , 107 , 104], "Id":502 ,
//          "quizzesTypes":["text", "number", "select"]},
//   {"name":"Quiz3", "departmentsId":[101 , 105 , 107 , 104], "Id":503 ,
//           "quizzesTypes":["text", "dependentUpon", "dependent"]},
//   {"name":"Quiz4", "departmentsId":[101 , 102 , 105 , 106], "Id":504 ,
//            "quizzesTypes":["select", "number", "checkbox"]},
//   {"name":"Quiz5", "departmentsId":[105 , 106 , 103 , 104], "Id":505 ,
//           "quizzesTypes":["text", "number", "checkbox"]},
//   {"name":"Quiz6", "departmentsId":[106 , 102 , 105 , 104], "Id":506 ,
//           "quizzesTypes":["dependentUpon", "dependent", "checkbox"]},
//   {"name":"Quiz7", "departmentsId":[107 , 106 , 103 , 104], "Id":507 ,
//           "quizzesTypes":["text", "number", "checkbox", "dependentUpon", "dependent"]},
//   {"name":"Quiz8", "departmentsId":[105 , 106 , 103 , 104], "Id":508 ,
//           "quizzesTypes":["text","text", "dependentUpon", "dependent", "checkbox"]}
// ]

  constructor(private _http : Http) { }

  getSchools() {
    return this._http.get('api/schools/').map(x => x.json());
  }



  getDepartmentsBySchool(schoolId: number) {
    return this._http.get('/api/departments').map(x => x.json().filter(dept => dept.schoolsId.indexOf(schoolId) > -1));
    //dept.schoolsId.indexOf(schoolId) > -1
  }

  getQuizzesByDepartment(quizId: number) {
    return this._http.get('/api/quizzes').map(x => x.json().filter(quiz => quiz.departmentsId.indexOf(quizId) > -1));
  }

  GetFormFields(typeId: number) {
    let formFields = this.quizzes.filter(quiz => quiz.Id == typeId)[0].quizzesTypes;
    return formFields;
  }

  GetQuiz(quizId:number) {
    return this._http.get('api/quizzes/?Id='+quizId).map(x => x.json());
  }



}
