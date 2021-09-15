import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormButton } from 'src/app/interfaces/button.interface';
import { FormField } from 'src/app/interfaces/form-field.interface';
import { AuthService } from '../guards/auth.service';
import { Loading } from 'src/app/utils/loading';
import { DOCUMENT } from '@angular/common';
import { Toast } from 'src/app/utils/toast';
import { HandleError } from 'src/app/utils/handleError';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html'
})
export class LoginPage {

	public loginForm: FormGroup = this.formBuilder.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(6)]]
	});

	public formFields: Array<FormField> = [
		{
			type: 'text',
			placeholder: 'Email',
			formControlName: 'email'
		},
		{
			type: 'password',
			placeholder: 'Senha',
			formControlName: 'password'
		}
	];

	public formButtons: Array<FormButton> = [
		{
			label: 'Entrar',
			onClick: () => this.signIn()
		},
		{
			label: 'Cadastre-se',
			onClick: () => this.redirectToRegister()
		}
	];

	// Initialize deferredPrompt for use later to show browser install prompt.
	public deferredPrompt = null;

    constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		public router: Router,
		private loading: Loading,
		private toast: Toast,
		private alertController: AlertController,
		@Inject(DOCUMENT) private document: Document,
		private platform: Platform
	) {
		this.document.addEventListener('keydown', (event: any) => {
			if(event.key === 'Enter') {
				this.signIn();
			}
		});

		if(!this.platform.is('pwa')) {
			window.addEventListener('beforeinstallprompt', (e) => {
				// Prevent the mini-infobar from appearing on mobile
				e.preventDefault();
				// Stash the event so it can be triggered later.
				this.deferredPrompt = e;
				// Update UI notify the user they can install the PWA
				this.showInstallPromotion();
			});
		}
	}

	public async showInstallPromotion() {
		const alert = await this.alertController.create({
			header: 'Deseja Instalar o Aplicativo?',
			message: `QUANTU é totalmente gratuito, desenvolvido como
				TCC pelo graduando Felipe Nascimento no curso Sistemas de Informação na
				Universidade Federal da Grande Dourados(UFGD).`,
			buttons: [
				{
					text:'Não aceito',
				},
				{
					text:'Aceito',
					handler: () => this.installApp()
				}],
		  });

		await alert.present();
	}

	public async signIn(): Promise<void> {
		const { email, password } = this.loginForm.value;

		try {
			if(!this.loginForm.valid) {
				throw Error('Email ou Senha inválidos!');
			}

			await this.loading.default();

			await this.authService.signIn(email.trim(), password);

			this.router.navigate(['/home'], { replaceUrl: true });
		} catch (err) {
			await this.toast.show(HandleError.getMessageError(err), 2000, 'danger');
		}

		await this.loading.hidde();
	}

	public redirectToRegister(): void {
		this.router.navigate(['/cadastro'], { replaceUrl: true });
	}

	private async installApp() {
		if (this.deferredPrompt) {
			this.deferredPrompt.prompt();
			this.deferredPrompt = null;
		}
	}
}
