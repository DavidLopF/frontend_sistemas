import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  hiddenFirstQuestions: boolean;
  hiddenSuccess: boolean;
  mth = '';
  we = '';
  ns = '';
  fl = '';
  ss = '';

  constructor(private toastr: ToastrService) {
    this.hiddenFirstQuestions = false;
    this.hiddenSuccess = true;
  }

  nextQuestion() {
    if (this.mth != '' || this.we != '' || this.ns != '' || this.fl != '' || this.ss != '') {
      this.hiddenFirstQuestions = true;
      this.hiddenSuccess = false;
    } else {
      this.toastr.warning('Hay campos vacios, revise y intente de nuevo', 'Advertencia');
    }
  }

  validateNumberInput(event: any) {
    const pattern = /[0-9]/;

    if (!pattern.test(event.key)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, '');
      this.toastr.warning('Solo se permiten números', 'Advertencia');
    }

  }

}
