import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Escoje tu carrera';
  hiddenWelcome = false;
  hiddenForm = true;
  hiddenResults = true;
  message = '';

  onNotify(identificador: string) {
    console.log(identificador);
    if (identificador === 'welcome') {
      this.hiddenWelcome = true;
      this.hiddenForm = false;
    } else if (identificador.split(':')[0] === 'form') {
      this.hiddenWelcome = true;
      this.hiddenForm = true;
      this.hiddenResults = false;
      this.message = identificador.split(':')[1];
    }
  }
}
