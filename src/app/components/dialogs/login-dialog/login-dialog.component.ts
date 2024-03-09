import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  showWarningMessage = false;
  constructor(private authService: AuthService,
              private dialogRef: MatDialogRef<LoginDialogComponent>) {
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick().subscribe(mouseEvent => {
      dialogRef.close();
    });
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    // console.log('Your form data : ', form.value);
    this.authService.login(form.value.userName, form.value.password).subscribe(success => {
      if (success) {
        this.showWarningMessage = false;
        // this.authService.refreshToken().subscribe( response => {
          window.location.assign('/home');
        // });
      } else {
        this.showWarningMessage = true;
      }
    });
  }
}
