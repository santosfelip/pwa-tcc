import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
	constructor(
		private authService: AuthService,
		private router: Router) { }

	canActivate(): boolean {
		let isAuthenticated = false;

		if(this.authService.isAuthenticated()) {
			isAuthenticated = true;
		} else {
			this.router.navigate(['/login'], { replaceUrl:true });
		}

		return isAuthenticated;
	}
}
