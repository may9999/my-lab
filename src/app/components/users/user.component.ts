import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../auth/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../dialogs/user-dialog/user-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { User } from '../../auth/models/user';

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
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {
  public active: boolean = true;
  displayedColumns: string[] = ['select', 'email', 'name', 'lastName', 'role'];
  dataSource!: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<UserData>(true, []);

  constructor(private userService: UserService, public dialog: MatDialog) {
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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    if (this.dataSource) {
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    } else {
      return false;
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.email}`;
  }

  openLoginDialog() {
    this.loadDialog('add', new User());
  }

  loadDialog(option: string, user: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '70%',
      height: 'auto',
      data: { 
        option: option ,
        user: user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this,this.loadUsersTable();
    });
  }

  inactivateUsers(): void {
    if (this.selection.hasValue()) {
      for (const usr of this.selection.selected) {
        this.userService.activateUser(usr._id, false).subscribe(() => {
          this.selection.clear();
          this.loadUsersTable();
        });
      }
    }
  }

  activateUsers(): void {
    if (this.selection.hasValue()) {
      for (const usr of this.selection.selected) {
        this.userService.activateUser(usr._id, true).subscribe(() => {
          this.selection.clear();
          this.loadUsersTable();
        });
      }
    }
  }

  editUser(user: any): void {
    this.loadDialog('edit', user);
  }
}
