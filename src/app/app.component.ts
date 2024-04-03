import { Component } from '@angular/core';
// import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mylbab';

  constructor() {
    // moment.locale('en');
    // const currentTimeEn = moment().format('LLL');
  }
}
