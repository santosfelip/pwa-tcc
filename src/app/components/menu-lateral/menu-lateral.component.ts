import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/guards/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent {
	public menuItens = [
		{
			label: 'Produtos Perto de Você',
			iconName: 'cart',
			link: '/home'
		},
		{
			label: 'Ranking de sua Cidade',
			iconName: 'trophy-sharp',
			link: '/ranking'
		},
		{
			label: 'Adicionar Produto',
			iconName: 'navigate-outline',
			link: '/addProduct'
		},
		{
			label: 'Meus Produtos',
			iconName: 'cloud-upload-outline',
			link: '/produto'
		},
		{
			label: 'Lista de Compra',
			iconName: 'document-text-outline',
			link: '/home'
		},
		{
			label: 'Perfil',
			iconName: 'person-circle-outline',
			link: '/perfil'
		},
		{
			label: 'Sair',
			iconName: 'exit-outline',
			link: '/login'
		}
	];

	public pointsUser: number = 0;

	constructor(
		private router: Router,
		private menuController: MenuController,
		private authService: AuthService,
		private userService: UserService
	) {}

	public getPointsUser(): void {
		this.pointsUser = this.userService.getCurrentUser()?.points;
	}

	public changeNavigation(route: string): void {
		if(route === '/login') {
			this.authService.logout();
		}

		if(this.router.url !== route) {
			this.router.navigate([route], { replaceUrl: true });
		} else {
			this.menuController.close();
		}
	}
}
