import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // { path: 'calendar', component: CalendarComponent },
  // { path: 'physical-health', component: PhysicalHealthComponent },
  // { path: 'nutritional-health', component: NutritionalHealthComponent },
  // { path: 'conf', component: ConfigurationComponent },
  // { path: 'email', component: EmailComponent },
  { path: '',  redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }