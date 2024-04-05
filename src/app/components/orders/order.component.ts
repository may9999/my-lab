import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { OrderDialogComponent } from '../dialogs/order-dialog/order-dialog.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, AfterViewInit {
  // public active: boolean = true;
  // displayedColumns: string[] = ['select', 'name', 'lastName', 'clientId', 'status'];
  displayedColumns: string[] = ['select', 'name', 'lastName'];
  dataSource!: MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<Order>(true, []);

  constructor(private orderService: OrderService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadUsersTable();
  }

  private loadUsersTable() {
    // const status = this.active ? 'active' : 'inactive';

    // this.userService.getUsers(status).subscribe(response => {
    //   this.dataSource = new MatTableDataSource(response);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // orderStatus() {
  //  this.loadUsersTable();
  // }

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
  checkboxLabel(row?: Order): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
  }

  openLoginDialog() {
    this.loadDialog('add', new Order());
  }

  loadDialog(option: string, order: Order): void {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '70%',
      height: 'auto',
      data: { 
        option: option ,
        order: order
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this,this.loadUsersTable();
    });
  }

  // inactivateUsers(): void {
  //   if (this.selection.hasValue()) {
  //     for (const usr of this.selection.selected) {
  //       this.userService.activateUser(usr._id, false).subscribe(() => {
  //         this.selection.clear();
  //         this.loadUsersTable();
  //       });
  //     }
  //   }
  // }

  // activateUsers(): void {
  //   if (this.selection.hasValue()) {
  //     for (const usr of this.selection.selected) {
  //       this.userService.activateUser(usr._id, true).subscribe(() => {
  //         this.selection.clear();
  //         this.loadUsersTable();
  //       });
  //     }
  //   }
  // }

  // editUser(user: any): void {
  //   this.loadDialog('edit', user);
  // }
}
