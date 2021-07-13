import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
})
export class MenuLateralComponent {
	constructor(
		private router: Router,
		private menuController: MenuController
	) {}

	public changeNavigation(route: string): void {
		if(this.router.url !== route) {
			this.router.navigate([route], { replaceUrl: true });
		} else {
			this.menuController.close();
		}
	}
}
