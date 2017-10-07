import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../services/school.service';
import { FakeBackendService } from '../services/fake-backend.service';
import { FormGroup , FormBuilder , FormControl , Validators , ValidatorFn} from '@angular/forms';
import { Observable } from 'rxjs';
import 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  schools:Observable<any[]>;
  departments: Observable<any[]>;
  quizzes:Observable<any[]>;
  selectedQuiz:Observable<any>;
  quizzesTypes : any[];
  quizForm:FormGroup;



  constructor(private schoolService : SchoolService,
    private fakeService : FakeBackendService,
      private formBuilder : FormBuilder) {
    this.quizForm = new FormGroup({});
   }

  ngOnInit() {
    this.schools = this.schoolService.GetSchools();
  }

  GetDepartment(id: number){
     this.departments = this.schoolService.GetDepartmentsBySchool(id);
  }

  GetQuizzes(id: number) {
    this.quizzes = this.schoolService.GetQuizzesByDepartment(id);
  }

  SelectQuiz(id: number){
    this.selectedQuiz = this.schoolService.GetQuiz(id);
    this.selectedQuiz.subscribe(x => this.quizzesTypes = x[0].quizzesTypes , x=> {console.log(x)}, () => { this.GenerateFormGroup()});
  }

  submit(form : FormGroup){
    console.log('The form');
    console.info(form.controls);
  }

  change(el:HTMLElement){
   console.log(  el.nodeValue);
  }

  GenerateFormGroup(){

    this.quizForm.controls = {};

    if(this.quizzesTypes != null) {
      for (let index in this.quizzesTypes){
      let name:string = this.quizzesTypes[index];
      name = name + index;
      let control : FormControl = new FormControl();
      this.quizForm.addControl(name,control);
   }
  }

  }
}
