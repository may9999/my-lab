import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
// import { AuthGuard } from './auth/guards/auth.guard';
import { UserComponent } from './components/users/user.component';
import { IsAdminGuard } from './auth/guards/auth.guard';
import { OrderComponent } from './components/orders/order.component';
import { ClinicalStudiesComponent } from './components/clinical-studies/clinical-studies.component';

const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [IsAdminGuard] },
  { path: 'user', component: UserComponent, canActivate: [IsAdminGuard] },
  { path: 'order', component: OrderComponent, canActivate: [IsAdminGuard] },
  { path: 'clinical-studies', component: ClinicalStudiesComponent, canActivate: [IsAdminGuard] },
  // { path: 'nutritional-health', component: NutritionalHealthComponent },
  // { path: 'conf', component: ConfigurationComponent },
  // { path: 'email', component: EmailComponent },
  // { path: '',  redirectTo: 'home', pathMatch: 'full' }
  { path: '',  redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }