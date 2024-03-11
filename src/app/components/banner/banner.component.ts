import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../dialogs/login-dialog/login-dialog.component';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  authenticated = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService, public dialog: MatDialog/*,
              private router: Router*/) { }

  ngOnInit(): void {
    this.authenticated = this.authService.isLoggedIn();
    if (this.authenticated) {
      console.log('aguevo');
    }
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
    this.authenticated = false;
    this.authService.logout().subscribe(() => {});
    this.isAdmin = false;
    window.location.assign('/landing');
 }
}
