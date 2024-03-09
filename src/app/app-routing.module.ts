import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'home', component: HomeComponent },
  // { path: 'calendar', component: CalendarComponent },
  // { path: 'physical-health', component: PhysicalHealthComponent },
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