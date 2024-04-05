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

// Components
import { HomeComponent } from './components/home/home.component';
import { BannerComponent } from './components/banner/banner.component';
import { LandingComponent } from './components/landing/landing.component';
import { UserComponent } from './components/users/user.component';
import { OrderComponent } from './components/orders/order.component';

// Dialogs
import { LoginDialogComponent } from './components/dialogs/login-dialog/login-dialog.component';
import { UserDialogComponent } from './components/dialogs/user-dialog/user-dialog.component';

// Services
import { UserService } from './auth/services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingComponent,
    BannerComponent,
    LoginDialogComponent,
    UserDialogComponent,
    UserComponent,
    OrderComponent
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
    MatSnackBarModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
