import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './auth/login/login.page';
import { HomePage } from './pages/home/home.page';
import { CadastroPage } from './auth/cadastro/cadastro.page';
import { PhotoPage } from './pages/photo/photo.page';

const routes: Routes = [
	{
		path: 'home',
		component: HomePage
	},
	{
		path: 'login',
		component: LoginPage
	},
	{
		path: 'photo',
		component: PhotoPage
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
	{ path: '**', redirectTo: 'login'}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
