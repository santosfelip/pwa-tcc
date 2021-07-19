import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/guards/auth.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html'
})
export class MenuLateralComponent {
	constructor(
		private router: Router,
		private menuController: MenuController,
		private authService: AuthService
	) {}

	public changeNavigation(route: string): void {
		if(this.router.url === '/login') {
			this.authService.logout();
		}

		if(this.router.url !== route) {
			this.router.navigate([route], { replaceUrl: true });
		} else {
			this.menuController.close();
		}
	}
}
