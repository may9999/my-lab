import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/auth/services/auth.service';
import { LoginDialogComponent } from '../dialogs/login-dialog/login-dialog.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  authenticate = false;
  // isAdmin: boolean;

  constructor(/*private authService: AuthService, */public dialog: MatDialog/*,
              private router: Router*/) { }

  ngOnInit(): void {
    // this.authenticate = this.authService.isLoggedIn();
    // if (this.authenticate) {
    // }
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '30%',
      height: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  logoutUser() {
//     this.authService.logout();
//     this.authenticate = false;
//     this.isAdmin = false;
//     window.location.assign('/');
 }
}
