import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {FormsModule, NgForm} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { AuthService } from 'src/app/auth/services/auth.service';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  // loginForm = new FormGroup({
  //   userName: new FormControl(),
  //   pass: new FormControl()
  // });
  showWarningMessage = false;
  constructor(/*private authService: AuthService,
              */private dialogRef: MatDialogRef<LoginDialogComponent>) {
    dialogRef.disableClose = true;
    dialogRef.backdropClick().subscribe(mouseEvent => {
      dialogRef.close();
    });
  }

  ngOnInit(): void {
  }

  // loginUser({value, valid}): void {
  // loginUser(): void {
  //   this.authService.login(value.userName, value.pass).subscribe(success => {
  //     if (success) {
  //       this.showWarningMessage = false;
  //       this.authService.refreshToken().subscribe( response => {
  //         window.location.assign('/');
  //       });
  //     } else {
  //       this.showWarningMessage = true;
  //     }
  //   });
  // }
  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);
  }
}
