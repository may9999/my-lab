import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../../../auth/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ROLES } from '../../models/roles'

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
  roles = ROLES;
  
  constructor(private dialogRef: MatDialogRef<UserDialogComponent>,
              private userService: UserService,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),
      name:  new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      clientCode: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      contactNumber: new FormControl('', []),
      neighborhood: new FormControl('', []),
      zipCode: new FormControl('', []),
    });

    if (this.data.option === 'edit') {
      this.userForm.get('email')?.setValue(this.data.user.email);
      this.userForm.get('name')?.setValue(this.data.user.name);
      this.userForm.get('lastName')?.setValue(this.data.user.lastName);
      this.userForm.get('role')?.setValue(this.data.user.role);
      this.userForm.get('clientCode')?.setValue(this.data.user.clientCode);
      this.userForm.get('address')?.setValue(this.data.user.address);
      this.userForm.get('contactNumber')?.setValue(this.data.user.contactNumber);
      this.userForm.get('neighborhood')?.setValue(this.data.user.neighborhood);
      this.userForm.get('zipCode')?.setValue(this.data.user.zipCode);
    }
  }

  onSubmit(): void {
     // Handle form submission here
    if (this.userForm.valid) {
      // Additional logic to authenticate user or 
      // perform other actions
      if (this.data.option === 'add') {
        this.userService.addUser(this.userForm.value).subscribe({
          next: () => {
            this.close();
          },
          error: e => {
            console.log(e.error);
            this.snackBar.open('ERROR', e.error.message, {
              duration: 5000 // 5 seconds
            });
          }
        });
      } else if (this.data.option === 'edit'){ // update user
        this.userService.updateUser(this.userForm.value, this.data.user._id).subscribe({
         next: () => {
          this.close();
         }, 
         error: e => {
          console.log(e.error);
          this.snackBar.open('ERROR', e.error.message, {
            duration: 5000 // 5 seconds
          });
         } 
        });
      } else {
        this.snackBar.open('ERROR', 'Invalid Option', {
          duration: 5000 // 5 seconds
        });
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
