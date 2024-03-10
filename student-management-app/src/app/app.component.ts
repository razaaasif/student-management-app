import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { Student } from './student.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  students: Student[] = [];
  student: Student = new Student();
  isLoading: boolean = true;
  showDialogue: boolean = false;
  submitted: boolean = false;
  editMode: boolean = false;
  searchValue!: string;
  constructor(
    private service: StudentService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.student = new Student();
    this.service.getStudents().subscribe((data) => {
      console.log('ngOnInit ' + JSON.stringify(data));
      this.students = data;
      this.isLoading = false;
    });
  }
  addStudent() {
    this.showDialogue = true;
    this.editMode = false;
  }

  hideDialog() {
    this.showDialogue = false;
  }
  saveStudent() {
    //dialogue hide
    this.showDialogue = false;
    // if editMode false then save else update
    if (this.editMode) {
      this.service.updateStudent(this.student).subscribe((data) => {
        console.log(JSON.stringify(data));
           this.showMessage('Student Updated Successfully!');
           this.loadData();
       })
    } else
    //data save
    this.service.addStudent(this.student).subscribe((data) => {
      this.showMessage('Student Saved Successfully!');
      this.loadData();
    });
    //load
  }
  showMessage(message: any, severity: string = '') {
    this.messageService.add({
      severity: severity !== '' ? severity : 'success',
      summary: message,
    });
  }
  delete(id: string) {
    this.service.delete(id).subscribe((data) => {
      this.showMessage('Student Deleted Successfully!', 'error');
      this.loadData();
    });
  }

  editStudent(student: Student) {
    this.editMode = true;
    this.student = this.copyStudent(student);
    //show dialoge
    this.showDialogue = true;
    //
  }
  copyStudent(student: Student): Student {
    return {
      _id: student._id,
      name: student.name,
      course: student.course,
      email: student.email,
      rollNo: student.rollNo,
    };
  }
}
