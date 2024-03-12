import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserService } from '../../auth/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  showWarningMessage = false;
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    // this.userService.getUser()
  }

  onSubmit(form: NgForm) {
    // console.log('Your form data : ', form.value);
    // this.authService.login(form.value.userName, form.value.password).subscribe(success => {
    //   if (success) {
    //     this.showWarningMessage = false;
    //     this.authService.refreshToken().subscribe( response => {
    //       window.location.assign('/home');
    //     });
    //   } else {
    //     this.showWarningMessage = true;
    //     form.controls['userName'].setValue(null);
    //     form.controls['password'].setValue(null);
    //   }
    // });
  }
}
