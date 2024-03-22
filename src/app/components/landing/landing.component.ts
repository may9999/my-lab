import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  authenticate = false;
  constructor(/*private authService: AuthService*/) { }

  ngOnInit(): void {
    // this.authenticate = this.authService.isLoggedIn();
    // if (this.authenticate) {
    //   // TODO...
    // }
  }

}
