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
   hum = '';
   eng = '';
   sci = '';
   health = '';

   constructor(private toastr: ToastrService) {
      this.hiddenFirstQuestions = false;
      this.hiddenSuccess = true;
   }

   nextQuestion() {
      if (this.mth != '' || this.we != '' || this.ns != '' || this.fl != '' || this.ss != '' || this.hum != '' || this.eng != '' || this.sci != '' || this.health != '') {
         this.hiddenFirstQuestions = true;
         this.hiddenSuccess = false;
      } else {
         this.toastr.warning('Hay campos vacios, revise e intente de nuevo', 'Advertencia');
      }
   }

   doTest() {
      if (this.mth != '' && this.we != '' && this.ns != '' && this.fl != '' && this.ss != '' && this.hum != '' && this.eng != '' && this.sci != '' && this.health != '') {
         let data = {
            "math": this.mth,
            "ns": this.ns,
            "we": this.we,
            "fl": this.fl,
            "ss": this.ss,
            "hum": this.hum,
            "eng": this.eng,
            "sci": this.sci,
            "health": this.health
         }

         fetch('http://127.0.0.1:5000/api/v1/getCarrer', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
               'Content-Type': 'application/json'
            }
         }).then(res => res.json())
            .then(response => {
               console.log('Success:', JSON.stringify(response));
            })
            .catch(error => console.error('Error:', error));

         this.toastr.success('Test realizado con éxito', 'Éxito');
      } else {
         this.toastr.warning('Hay campos vacios, revise e intente de nuevo', 'Advertencia');
      }
   }

   validateNumberInput(event: any) {
      const pattern = /[0-9]/;

      if (!pattern.test(event.key) && event.key != "") {
         event.target.value = event.target.value.replace(/[^0-9]/g, '');
         this.toastr.warning('Solo se permiten números', 'Advertencia');
      }

      //validar que las entradas sean entre 1 y 100
      if (event.target.value > 100) {
         event.target.value = 100;
         this.toastr.warning('Solo se permiten números entre 1 y 100', 'Advertencia');
      } else if (event.target.value < 1) {
         event.target.value = 1;
         this.toastr.warning('Solo se permiten números entre 1 y 100', 'Advertencia');
      }

   }

}
