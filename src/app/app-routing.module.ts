import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './auth/login/login.page';
import { HomePage } from './pages/home/home.page';
import { CadastroPage } from './auth/cadastro/cadastro.page';
import { AddProductPage } from './pages/add-product/add-product.page';
import { PerfilPage } from './pages/perfil/perfil.page.component';
import { AuthGuardService } from './auth/guards/auth-guard.service';
import { ProductPage } from './pages/product/product.page';
import { RankingPage } from './pages/ranking/ranking.page';
import { WelcomePage } from './pages/welcome/welcome.page';
import { ProductDetailsPage } from './pages/product-details/product-details.page';
import { PurchaseListPage } from './pages/purchase-list/purchase-list.page';

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
		path: 'addProduct',
		component: AddProductPage,
		canActivate: [AuthGuardService]
	},
	{
		path: 'ranking',
		component: RankingPage,
		canActivate: [AuthGuardService]
	},
	{
		path: 'welcome',
		component: WelcomePage,
		canActivate: [AuthGuardService]
	},
	{
		path: 'product-details/:productId',
		component: ProductDetailsPage,
		canActivate: [AuthGuardService]
	},
	{
		path: 'purchase-list',
		component: PurchaseListPage,
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
