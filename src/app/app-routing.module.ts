import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './auth/login/login/login.page';
import { HomePage } from './pages/home/home.page';

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
