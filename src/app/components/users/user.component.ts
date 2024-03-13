import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { UserService } from '../../auth/services/user.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

export interface UserData {
  email: string;
  active: boolean;
  lastName: string;
  name: string;
  passReset: boolean;
  role: string;
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['email', 'name', 'lastName', 'role'];
  dataSource!: MatTableDataSource<UserData>;
  // userForm!: FormGroup;
  // matcher = new MyErrorStateMatcher();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, /*private formBuilder: FormBuilder*/) {
    this.userService.getUsers('active').subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
    });
  }

  ngOnInit(): void {
    // this.userForm = new FormGroup({
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),
    //   // name:  new FormControl('', [Validators.required]),
    //   // lastName: new FormControl('', [Validators.required]),
    //   // role: new FormControl('', [Validators.required])
    // });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSubmit() {
    // // Handle form submission here
    // if (this.userForm.valid) {
    //   console.log(this.userForm.value);
    //   // Additional logic to authenticate user or 
    //   // perform other actions
    // }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
