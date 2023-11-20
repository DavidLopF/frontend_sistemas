import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Escoje tu carrera';
  hiddenWelcome = false;

  onNotify(identificador: string) {
    if (identificador === 'welcome') {
      this.hiddenWelcome = true;
    }
  }
}
