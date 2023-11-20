import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  hiddenFirstQuestions:boolean;
  hiddenSuccess:boolean;

  constructor() {

    this.hiddenFirstQuestions = false;
    this.hiddenSuccess = true;
   }

  nextQuestion() {
    console.log("hola");
    this.hiddenFirstQuestions = true;
    this.hiddenSuccess = false;
  }

}
