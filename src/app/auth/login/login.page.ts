import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormButton } from 'src/app/interfaces/button.interface';
import { FormField } from 'src/app/interfaces/form-field.interface';
import { AuthService } from '../guards/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html'
})
export class LoginPage {
	public loginForm: FormGroup = this.formBuilder.group({
		email: '',
		password: ''
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

    constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		public router: Router,
		public toastController: ToastController,
		private loadingController: LoadingController) { }

	public async signIn(): Promise<void> {
		const { email, password } = this.loginForm.value;

		const loading = await this.loadingController.create({
			duration: 3000
		});
		try {
			await loading.present();

			await this.authService.signIn(email, password);

			loading.dismiss();
			this.router.navigate(['/home'], { replaceUrl: true });
		} catch (err) {
			loading.dismiss();
			const toast = await this.toastController.create({
				message: 'Email ou Senha inválidos!',
				duration: 2000,
				color: 'danger'
			});
			toast.present();
		}
	}

	public redirectToRegister(): void {
		this.router.navigate(['/cadastro'], { replaceUrl: true });
	}

}
