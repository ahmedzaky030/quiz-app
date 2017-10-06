import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../services/school.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  schools:any[];
  departments: any[];
  quizzes:any[];
  selectedQuiz:any;
  quizzesTypes : any[];


  constructor(private schoolService : SchoolService) { }

  ngOnInit() {
    this.schools = this.schoolService.schools;
    console.log(this.schools);
    console.log(this.schoolService.schools);
    console.log(this.schools);
  }

  GetDepartment(id: number){
    this.departments =  this.schoolService.getDepartmentsBySchool(id);
  }

  GetQuizzes(id: number) {
    this.quizzes = this.schoolService.getQuizzesByDepartment(id);

  }

  SelectQuiz(id: number){
    console.log("Select Quiz Function " + id );
    this.selectedQuiz = this.quizzes.filter(quiz => quiz.Id == id);
    console.log('selected Quiz');
    console.log(this.selectedQuiz);
    this.quizzesTypes = this.schoolService.GetFormFields(id);
  }
}
