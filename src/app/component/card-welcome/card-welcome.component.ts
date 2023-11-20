import { Component } from '@angular/core';
import { Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-card-welcome',
  templateUrl: './card-welcome.component.html',
  styleUrls: ['./card-welcome.component.css']
})
export class CardWelcomeComponent {

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  notify() {
    this.notifyParent.emit('welcome');
  }

}
