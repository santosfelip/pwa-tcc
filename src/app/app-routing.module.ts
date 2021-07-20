import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './auth/login/login.page';
import { HomePage } from './pages/home/home.page';
import { CadastroPage } from './auth/cadastro/cadastro.page';
import { PhotoPage } from './pages/photo/photo.page';
import { PerfilPage } from './pages/perfil/perfil.page.component';
import { AuthGuardService } from './auth/guards/auth-guard.service';
import { ProductPage } from './pages/product/product.page';

const routes: Routes = [
	{
		path: 'home',
		component: HomePage,
		canActivate: [AuthGuardService]
	},
	{
		path: 'login',
		component: LoginPage
	},
	{
		path: 'produto',
		component: ProductPage,
		canActivate: [AuthGuardService]
	},
	{
		path: 'perfil',
		component: PerfilPage,
		canActivate: [AuthGuardService]
	},
	{
		path: 'photo',
		component: PhotoPage,
		canActivate: [AuthGuardService]
	},
	{
		path: 'cadastro',
		component: CadastroPage
	},
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{ path: '**', redirectTo: 'login' }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
