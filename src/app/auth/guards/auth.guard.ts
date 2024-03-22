import { Inject, Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
// class AuthGuard {

//   constructor(private authService: AuthService, private router: Router) { }

//   canActivate() {
//     if (this.authService.isLoggedIn()) {
//       // this.router.navigate(['/']);
//     }
//     return !this.authService.isLoggedIn();
//   }
// }

// export const isAdminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
//   return inject(isAdminGuard).canActivate(route, state);
// }

// export class AuthGuard implements CanActivate {

//   constructor(private authService: AuthService, private router: Router) { }

//   canActivate() {
//     return this.authService.isLoggedIn();
//     // if (this.authService.isLoggedIn()) {
//     //   // return this.router.navigate(['/']);
//     //   return true;
//     // } else {
//     //   // return this.router.navigate(['/landing']);
//     //   return this.authService.isLoggedIn();
//     // }
//     // // return !this.authService.isLoggedIn();
//   }

class AuthGuard {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.authService.isLoggedIn();
  }
}
export const IsAdminGuard: CanActivateChildFn = (route: ActivatedRouteSnapshot,
state: RouterStateSnapshot): boolean => {
  return inject(AuthGuard).canActivate(route, state);
}
