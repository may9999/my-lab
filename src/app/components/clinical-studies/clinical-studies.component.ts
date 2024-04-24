import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClinicalStudiesService } from '../services/clinical-studies.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClinicalStudyDialogComponent } from '../dialogs/clinical-study-dialog/clinical-study-dialog.component';

export interface ClinicalStudyData {
  _id: string;
  code: string;
  name: string;
  referenceValues: string;
  cost: number;
  description: string;
}
@Component({
  selector: 'app-clinical-studies',
  templateUrl: './clinical-studies.component.html',
  styleUrls: ['./clinical-studies.component.scss']
})
export class ClinicalStudiesComponent implements OnInit, AfterViewInit {
  public active: boolean = true;
  clinicalForm!: FormGroup;
  displayedColumns: string[] = ['select', 'code', 'name', 'referenceValues', 'cost', 'description'];
  dataSource!: MatTableDataSource<ClinicalStudyData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<ClinicalStudyData>(true, []);

  constructor(private clinicalSvc: ClinicalStudiesService, 
              private snackBar: MatSnackBar, 
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.clinicalForm = new FormGroup({
      code: new FormControl('', [Validators.required]),
      name:  new FormControl('', [Validators.required]),
      referenceValues:  new FormControl('', [Validators.required]),
      cost:  new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,5}(?:.[0-9]{1,2})?$')]),
      description: new FormControl('', []),
    });
  }

  ngAfterViewInit() {
    this.loadTable();
  }

  onSubmit(): void {
     // Handle form submission here
     if (this.clinicalForm.valid) {
      // Additional logic to authenticate user or 
      // perform other actions
      
      this.clinicalSvc.addStudy(this.clinicalForm.value).subscribe({
        next: () => {
          // this.close();
          this.clinicalForm.reset();
        },
        error: e => {
          console.log(e.error);
          this.snackBar.open('ERROR', e.error.message, {
            duration: 5000 // 5 seconds
          });
        }
      });
    }
    // this.clinicalSvc.addStudy().subscribe(() => {
    // });
  }

  private loadTable() {
    const status = this.active ? 'active' : 'inactive';

    this.clinicalSvc.getClinicalStudies(status).subscribe(response => {
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
  checkboxLabel(row?: ClinicalStudyData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
  }

  editClinicalStudy(study: ClinicalStudyData): void {
    this.loadDialog('edit', study);
  }

  // openLoginDialog() {
  //   this.loadDialog('add', new ClinicalStudy());
  // }

  loadDialog(option: string, study: ClinicalStudyData): void {
    const dialogRef = this.dialog.open(ClinicalStudyDialogComponent, {
      width: '70%',
      height: 'auto',
      data: { 
        option: option ,
        study: study
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this,this.loadTable();
    });
  }

  inactivate(): void {
    if (this.selection.hasValue()) {
      for (const study of this.selection.selected) {
        this.clinicalSvc.activateStudy(study._id, false).subscribe(() => {
          this.selection.clear();
          this.loadTable();
        });
      }
    }
  }

  activate(): void {
    if (this.selection.hasValue()) {
      for (const study of this.selection.selected) {
        this.clinicalSvc.activateStudy(study._id, true).subscribe(() => {
          this.selection.clear();
          this.loadTable();
        });
      }
    }
  }

  ClinicalStudiesStatus() {
    this.loadTable();
  }
}
