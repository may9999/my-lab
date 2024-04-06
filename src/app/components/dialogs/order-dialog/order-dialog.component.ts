import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SEX_TYPE } from '../../models/sex.type'
import { PAYMENT } from '../../models/payment'
import { PAYMENT_TYPE } from '../../models/payment.type'
import { Order } from '../../models/order';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserService } from '../../../auth/services/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
// export interface User {
//   name: string;
// }
export interface UserData {
  _id: string;
  email: string;
  active: boolean;
  lastName: string;
  name: string;
  passReset: boolean;
  role: string;
}
@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss'],
})
export class OrderDialogComponent implements OnInit {
  orderForm!: FormGroup;
  // roleSelected!: string;
  // roleControl = new FormControl<any | null>(null, Validators.required);
  // matcher = new MyErrorStateMatcher();
  sexTypes = SEX_TYPE;
  payments = PAYMENT;
  paymentTypes = PAYMENT_TYPE;
  // display = true;
  // myControl = new FormControl<string | User>('', [Validators.required]);
  // options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
  // filteredOptions!: Observable<User[]>;
  myControl = new FormControl<string | UserData>('', [Validators.required]);
  options: UserData[] = [];
  filteredOptions!: Observable<UserData[]>;
  
  constructor(private dialogRef: MatDialogRef<OrderDialogComponent>,
              private userService: UserService,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });
  }

  ngOnInit(): void {
    this.userService.getUsers('active').subscribe(response => {
      console.log(response);
      this.options = response;
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
    this.orderForm = new FormGroup({
      name:  new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.pattern('\\b([1-9]|[1-9][0-9]|1[01][0-9]|15[0-9])\\b')]),
      sexType: new FormControl('', [Validators.required]),
      clientId: new FormControl('', [Validators.required]),
      payment: new FormControl('', [Validators.required]),
      paymentType: new FormControl('', [Validators.required]),
      comments: new FormControl('', []),
      status: new FormControl({value: '', disabled: true})
    });

    if (this.data.option === 'edit') {
      this.orderForm.get('status')?.setValue(this.data.order.status);
      // this.loadForm(this.data.user.role);
    } else {
      this.orderForm.get('status')?.setValue('NEW');
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

  // loadForm(role: string) {
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
  // }

  // displayFn(user: User): string {
  //   return user && user.name ? user.name : '';
  // }
  displayFn(user: UserData): string {
    return user && user.name ? user.name : '';
  }

  // private _filter(name: string): User[] {
  //   const filterValue = name.toLowerCase();

  //   return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  // }
  private _filter(name: string): UserData[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  clientOnChange(event: any) {
    this.orderForm.get('clientId')?.setValue(event.option.value._id);
  }

  onChange(event: Event) {
    // Get the new input value
    const newValue = (event.target as HTMLInputElement).value;
    // Perform actions based on the new value
    // This logic is if you change or modify the value in the input of the
    // autocomplete then this will clear the values because that means the user
    // affected the control and the value selected changed to an incorrect value
    // that is why we clear this in order to the user correct it and select using
    // clientOnChange(event: any)
    this.orderForm.get('clientId')?.setValue(null);
    this.myControl.setValue(null);
  }

  close(): void {
    this.dialogRef.close();
  }
}
