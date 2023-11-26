import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Output, EventEmitter } from '@angular/core';

@Component({
   selector: 'app-form',
   templateUrl: './form.component.html',
   styleUrls: ['./form.component.css']
})
export class FormComponent {
   hiddenFirstQuestions: boolean;
   hiddenSuccess: boolean;
   hiddenResults: boolean;
   mth = '';
   we = '';
   ns = '';
   fl = '';
   ss = '';
   hum = '';
   eng = '';
   sci = '';
   health = '';
   message = '';

   @Output() notifyParent: EventEmitter<string> = new EventEmitter();

   constructor(private toastr: ToastrService) {
      this.hiddenFirstQuestions = false;
      this.hiddenSuccess = true;
      this.hiddenResults = true;
   }


   notify(msg: string) {
      this.notifyParent.emit("form:" + msg);
   }


   nextQuestion() {
      if (this.mth != '' || this.we != '' || this.ns != '' || this.fl != '' || this.ss != '' || this.hum != '' || this.eng != '' || this.sci != '' || this.health != '') {
         this.hiddenFirstQuestions = true;
         this.hiddenSuccess = false;
         console.log(this.mth);
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
               //console.log('Success:', response[0]);
               this.message = response[0];
               this.notify(this.message);
            })
            .catch(error => console.error('Error:', error));

         this.toastr.success('Test realizado con éxito', 'Éxito');
      } else {
         this.toastr.warning('Hay campos vacios, revise e intente de nuevo', 'Advertencia');
      }
   }

   validateNumberInput(event: any) {
      const pattern = /[0-9]/;

      if (!pattern.test(event.key) && event.key != "" && event.key != "Tab" && event.key != "Backspace" && event.key != "ArrowLeft" && event.key != "ArrowRight" && event.key != "Delete" && event.key != "Enter" && event.key != "Home" && event.key != "End" && event.key != "Control" && event.key != "Shift" && event.key != "Alt" && event.key != "CapsLock" && event.key != "Escape" && event.key != "Meta" && event.key != "ArrowUp" && event.key != "ArrowDown" && event.key != "ContextMenu" && event.key != "PageUp" && event.key != "PageDown" && event.key != "Insert" && event.key != "F1" && event.key != "F2" && event.key != "F3" && event.key != "F4" && event.key != "F5" && event.key != "F6" && event.key != "F7" && event.key != "F8" && event.key != "F9" && event.key != "F10" && event.key != "F11" && event.key != "F12" && event.key != "ScrollLock" && event.key != "Pause") {
         event.target.value = event.target.value.replace(/[^0-9]/g, '');
         this.toastr.warning('Solo se permiten números', 'Advertencia');
      }

      //validar que las entradas sean entre 1 y 100
      if (event.target.value > 100 && event.target.value != "") {
         event.target.value = "";
         this.toastr.warning('Solo se permiten números entre 1 y 100', 'Advertencia');
      } else if (event.target.value < 1 && event.target.value != "") {
         event.target.value = "";
         this.toastr.warning('Solo se permiten números entre 1 y 100', 'Advertencia');
      }

   }

   return() {
      this.hiddenFirstQuestions = false;
      this.hiddenSuccess = true;
   }

}
