import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormButton } from 'src/app/interfaces/button.interface';
import { FormField } from 'src/app/interfaces/form-field.interface';
import { AuthService } from '../guards/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html'
})
export class CadastroPage {
	public registerForm: FormGroup = this.formBuilder.group({
		name: '',
		email: '',
		password: ''
	});

	public formFields: Array<FormField> = [
		{
			type: 'text',
			placeholder: 'Nome Completo',
			formControlName: 'name'
		},
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
			label: 'Cadastrar',
			onClick: () => this.signUp()
		},
		{
			label: 'Entre',
			onClick: () => this.redirectToLogin()
		}
	];

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router,
		public toastController: ToastController
	) { }

	public redirectToLogin(): void {
		this.router.navigate(['/login'], { replaceUrl: true });
	}

	public async signUp(): Promise<void> {
		const newUser = this.registerForm.value;

		try {
			await this.authService.signUp(newUser);

			const toast = await this.toastController.create({
				message: 'Usuário Cadastrado com Sucesso!',
				duration: 3000,
				color: 'success'
			});
			toast.present();

			this.redirectToLogin();
		} catch (err) {
			const toast = await this.toastController.create({
				message: 'Dados inválidos!',
				duration: 2000,
				color: 'danger'
			});
			toast.present();
		}
	}
}
