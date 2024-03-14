import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../auth/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../dialogs/user-dialog/user-dialog.component';

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
  public active: boolean = true;
  displayedColumns: string[] = ['email', 'name', 'lastName', 'role'];
  dataSource!: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, public dialog: MatDialog /*private formBuilder: FormBuilder*/) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadUsersTable();
  }

  private loadUsersTable() {
    const status = this.active ? 'active' : 'inactive';

    this.userService.getUsers(status).subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  userStatus() {
   this.loadUsersTable();
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '70%',
      height: '85%'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
