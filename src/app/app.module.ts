import { NgModule } from '@angular/core';
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
import { PhotoPage } from './pages/photo/photo.page';
import { PerfilPage } from './pages/perfil/perfil.page.component';

@NgModule({
	declarations: [
		AppComponent,
		HomePage,
		PhotoPage,
		PerfilPage,
		CadastroPage,
		HeaderComponent,
		ProdutosListaComponent,
		LoginPage,
		MenuLateralComponent
	],
	entryComponents: [],
	imports:
	[
		BrowserModule,
		IonicModule,
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
	providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
	bootstrap: [AppComponent],
})
export class AppModule {}
