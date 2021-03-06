import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomePage } from './pages/home/home.page';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroPage } from './auth/cadastro/cadastro.page';
import { HeaderComponent } from './components/header/header.component';
import { LoginPage } from './auth/login/login.page';
import { ProdutosListaComponent } from './components/produtos-lista/produtos-lista.component';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { AddProductPage } from './pages/add-product/add-product.page';
import { PerfilPage } from './pages/perfil/perfil.page.component';
import { FormComponent } from './components/form/form.component';
import { AuthGuardService } from './auth/guards/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { ProdutoComponent } from './components/produtos-lista/produto/produto.component';
import { ProductPage } from './pages/product/product.page';
import { CategoriesComponent } from './components/categories/categories.component';
import { SelectStateCityComponent } from './components/select-state-city/select-state-city.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RankingPage } from './pages/ranking/ranking.page';
import { WelcomePage } from './pages/welcome/welcome.page';
import { ProductDetailsPage } from './pages/product-details/product-details.page';
import { PurchaseListPage } from './pages/purchase-list/purchase-list.page';
@NgModule({
	declarations: [
		AppComponent,
		RankingPage,
		WelcomePage,
		ProductDetailsPage,
		PurchaseListPage,
		ProdutoComponent,
		NotFoundComponent,
		CategoriesComponent,
		HomePage,
		SelectStateCityComponent,
		ProductPage,
		AddProductPage,
		PerfilPage,
		CadastroPage,
		HeaderComponent,
		ProdutosListaComponent,
		LoginPage,
		MenuLateralComponent,
		FormComponent
	],
	entryComponents: [],
	imports:
	[
		BrowserModule,
		IonicModule,
		HttpClientModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		CommonModule,
    	FormsModule,
    	ReactiveFormsModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
			registrationStrategy: 'registerWhenStable:30000'
		})
	],
	providers: [
		AuthGuardService,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
	],
	bootstrap: [AppComponent],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
