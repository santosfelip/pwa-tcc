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
import { PhotoPage } from './pages/photo/photo.page';
import { PerfilPage } from './pages/perfil/perfil.page.component';
import { FormComponent } from './components/form/form.component';
import { AuthGuardService } from './auth/guards/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		AppComponent,
		HomePage,//import { HttpClientModule, HttpClient } from '@angular/common/http';
		PhotoPage,
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
