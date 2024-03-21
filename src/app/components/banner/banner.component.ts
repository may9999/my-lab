import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../dialogs/login-dialog/login-dialog.component';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/models/user';
import { UserService } from '../../auth/services/user.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  authenticated = false;
  isAdmin: boolean = false;
  public user: User | undefined;

  constructor(private authService: AuthService, 
              private userService: UserService,
              public dialog: MatDialog/*,
              private router: Router*/) { }

  ngOnInit(): void {
    this.authenticated = this.authService.isLoggedIn();
    if (this.authenticated) {
      const userId = this.authService.getItemUserId();
      if (userId !== null) {
        this.userService.getUser(userId).subscribe(response => {
          this.user = new User(response);
          this.isAdmin = response.role === 'ADMIN' ? true: false;
        });
      }
    }
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '30%',
      height: 'auto'
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
