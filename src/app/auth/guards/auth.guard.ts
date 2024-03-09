import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
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

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      // this.router.navigate(['/']);
    }
    return !this.authService.isLoggedIn();
  }
}
