import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { UserService } from '../../../auth/services/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
export interface ClinicalStudyData {
  _id: string;
  code: string;
  name: string;
  referenceValues: string;
  cost: number;
  description: string;
}
@Component({
  selector: 'app-clinical-study-dialog',
  templateUrl: './clinical-study-dialog.component.html',
  styleUrls: ['./clinical-study-dialog.component.scss'],
})
export class ClinicalStudyDialogComponent implements OnInit {
  clinicalForm!: FormGroup;
  // roleSelected!: string;
  // roleControl = new FormControl<any | null>(null, Validators.required);
  // matcher = new MyErrorStateMatcher();
  // payments = PAYMENT;
  // paymentTypes = PAYMENT_TYPE;
  // display = true;
  
  constructor(private dialogRef: MatDialogRef<ClinicalStudyDialogComponent>,
              private userService: UserService,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });
  }

  ngOnInit(): void {    
    this.clinicalForm = new FormGroup({
      code: new FormControl('', [Validators.required]),
      name:  new FormControl('', [Validators.required]),
      referenceValues:  new FormControl('', [Validators.required]),
      cost:  new FormControl('', [Validators.required]),
      description: new FormControl('', []),
    });

    if (this.data.option === 'edit') {
      this.clinicalForm.get('code')?.setValue(this.data.study.code);
      this.clinicalForm.get('name')?.setValue(this.data.study.name);
      this.clinicalForm.get('referenceValues')?.setValue(this.data.study.referenceValues);
      this.clinicalForm.get('cost')?.setValue(this.data.study.cost);
      this.clinicalForm.get('description')?.setValue(this.data.study.description); 
    }
  }

  onSubmit(): void {
    //  // Handle form submission here
    // if (this.userForm.valid) {
    //   // Additional logic to authenticate user or 
    //   // perform other actions
    //   if (this.data.option === 'add') {
    //     this.userService.addUser(this.userForm.value).subscribe({
    //       next: () => {
    //         this.close();
    //       },
    //       error: e => {
    //         console.log(e.error);
    //         this.snackBar.open('ERROR', e.error.message, {
    //           duration: 5000 // 5 seconds
    //         });
    //       }
    //     });
    //   } else if (this.data.option === 'edit'){ // update user
    //     this.userService.updateUser(this.userForm.value, this.data.user._id).subscribe({
    //      next: () => {
    //       this.close();
    //      }, 
    //      error: e => {
    //       console.log(e.error);
    //       this.snackBar.open('ERROR', e.error.message, {
    //         duration: 5000 // 5 seconds
    //       });
    //      } 
    //     });
    //   } else {
    //     this.snackBar.open('ERROR', 'Invalid Option', {
    //       duration: 5000 // 5 seconds
    //     });
    //   }
    // }
  }

  // roleOnChange(event: any) {
  //   this.loadForm(event.value);
  // }

  loadForm(option: string) {
  //   if (role === 'CLIENT') {
  //     this.display = true;
  //     this.userForm = new FormGroup({
  //       email: new FormControl('', [Validators.required, Validators.email]),
  //       password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),
  //       name:  new FormControl('', [Validators.required]),
  //       lastName: new FormControl('', []),
  //       role: new FormControl('', [Validators.required]),
  //       code: new FormControl('', [Validators.required]), // Requited for Client
  //       address: new FormControl('', []),
  //       contactNumber: new FormControl('', []),
  //       neighborhood: new FormControl('', []),
  //       city: new FormControl('', []),
  //       zipCode: new FormControl('', []),
  //     });
  //   } else { // user with different roles excepting CLIENT
  //     this.display = false;
  //     this.userForm = new FormGroup({
  //       email: new FormControl('', [Validators.required, Validators.email]),
  //       password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),
  //       name:  new FormControl('', [Validators.required]),
  //       lastName: new FormControl('', [Validators.required]),
  //       role: new FormControl('', [Validators.required]),
  //       code: new FormControl('', []), // Not Required for Employee
  //       address: new FormControl('', []),
  //       contactNumber: new FormControl('', []),
  //       neighborhood: new FormControl('', []),
  //       city: new FormControl('', []),
  //       zipCode: new FormControl('', []),
  //     });
  //   }
  //   this.userForm.get('role')?.setValue(role);

  //   if (this.data.option === 'edit') {
  //     this.userForm.get('email')?.setValue(this.data.user.email);
  //     this.userForm.get('name')?.setValue(this.data.user.name);
  //     this.userForm.get('lastName')?.setValue(this.data.user.lastName);
  //     this.userForm.get('code')?.setValue(this.data.user.code);
  //     this.userForm.get('address')?.setValue(this.data.user.address);
  //     this.userForm.get('contactNumber')?.setValue(this.data.user.contactNumber);
  //     this.userForm.get('neighborhood')?.setValue(this.data.user.neighborhood);
  //     this.userForm.get('city')?.setValue(this.data.user.city);
  //     this.userForm.get('zipCode')?.setValue(this.data.user.zipCode);
  //   }
  }

  close(): void {
    this.dialogRef.close();
  }
}
