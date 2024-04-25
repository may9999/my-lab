import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';



// Components
import { HomeComponent } from './components/home/home.component';
import { BannerComponent } from './components/banner/banner.component';
import { LandingComponent } from './components/landing/landing.component';
import { UserComponent } from './components/users/user.component';
import { OrderComponent } from './components/orders/order.component';
import { ClinicalStudiesComponent } from './components/clinical-studies/clinical-studies.component';

// Dialogs
import { LoginDialogComponent } from './components/dialogs/login-dialog/login-dialog.component';
import { UserDialogComponent } from './components/dialogs/user-dialog/user-dialog.component';
import { OrderDialogComponent } from './components/dialogs/order-dialog/order-dialog.component';
import { ClinicalStudyDialogComponent } from './components/dialogs/clinical-study-dialog/clinical-study-dialog.component';
import { PackageDialogComponent } from './components/dialogs/package-dialog/package-dialog.component';

// Services
import { UserService } from './auth/services/user.service';
import { OrderService } from './components/services/order.service';
import { ClinicalStudiesService } from './components/services/clinical-studies.service';
import { PackageStudiesService } from './components/services/package-studies.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingComponent,
    BannerComponent,
    LoginDialogComponent,
    UserDialogComponent,
    OrderDialogComponent,
    ClinicalStudyDialogComponent,
    PackageDialogComponent,
    UserComponent,
    OrderComponent,
    ClinicalStudiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatListModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    UserService,
    OrderService,
    ClinicalStudiesService,
    PackageStudiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
