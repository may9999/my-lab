import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit {
  userForm!: FormGroup;
  roleSelected!: string;
  roleControl = new FormControl<any | null>(null, Validators.required);
  matcher = new MyErrorStateMatcher();
  roles: string[] = [
    'ADMIN',
    'MANAGER',
    'TECHNICAL',
    'USER',
    'CUSTOMER'
  ];
  
  constructor(private dialogRef: MatDialogRef<UserDialogComponent>) {
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick().subscribe(mouseEvent => {
      dialogRef.close();
    });
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),
      name:  new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
     // Handle form submission here
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      // Additional logic to authenticate user or 
      // perform other actions
    }
  }
}
