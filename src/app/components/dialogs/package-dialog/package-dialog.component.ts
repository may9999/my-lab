import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PackageStudiesService } from '../../services/package-studies.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
export interface PackageStudyData {
  _id: string;
  code: string;
  name: string;
  cost: number;
  studies: Array<string>;
  description: string;
}
@Component({
  selector: 'app-package-dialog',
  templateUrl: './package-dialog.component.html',
  styleUrls: ['./package-dialog.component.scss'],
})
export class PackageDialogComponent implements OnInit {
  packageForm!: FormGroup;
  // roleSelected!: string;
  // roleControl = new FormControl<any | null>(null, Validators.required);
  // matcher = new MyErrorStateMatcher();
  // payments = PAYMENT;
  // paymentTypes = PAYMENT_TYPE;
  // display = true;
  
  constructor(private dialogRef: MatDialogRef<PackageDialogComponent>,
              private packageSvc: PackageStudiesService,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });
  }

  ngOnInit(): void {    
    this.packageForm = new FormGroup({
      code: new FormControl('', [Validators.required]),
      name:  new FormControl('', [Validators.required]),
      cost:  new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,5}(?:.[0-9]{1,2})?$')]),
      description: new FormControl('', []),
    });

    // if (this.data.option === 'edit') {
    //   this.clinicalForm.get('code')?.setValue(this.data.study.code);
    //   this.clinicalForm.get('name')?.setValue(this.data.study.name);
    //   this.clinicalForm.get('cost')?.setValue(this.data.study.cost);
    //   this.clinicalForm.get('description')?.setValue(this.data.study.description); 
    // }
  }

  onSubmit(): void {
     // Handle form submission here
    if (this.packageForm.valid) {
      const packageData = this.packageForm.value;
      packageData.studies = [];
      this.data.package.forEach((pack: any ) => {
        packageData.studies.push(pack._id);
      });
      // packageData.studies = this.data.package;
      this.packageSvc.addPackage(packageData).subscribe(() => {
        this.close();
      })


      // // Additional logic to authenticate user or 
      // // perform other actions


      // // if (this.data.option === 'add') {
      // //   this.userService.addUser(this.userForm.value).subscribe({
      // //     next: () => {
      // //       this.close();
      // //     },
      // //     error: e => {
      // //       console.log(e.error);
      // //       this.snackBar.open('ERROR', e.error.message, {
      // //         duration: 5000 // 5 seconds
      // //       });
      // //     }
      // //   });
      // // } else 
      // if (this.data.option === 'edit'){ // update user
      //   this.clinicalSvc.updateStudy(this.packageForm.value, this.data.study._id).subscribe({
      //    next: () => {
      //     this.close();
      //    }, 
      //    error: e => {
      //     console.log(e.error);
      //     this.snackBar.open('ERROR', e.error.message, {
      //       duration: 5000 // 5 seconds
      //     });
      //    } 
      //   });
      // } else {
      //   this.snackBar.open('ERROR', 'Invalid Option', {
      //     duration: 5000 // 5 seconds
      //   });
      // }
    }
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
