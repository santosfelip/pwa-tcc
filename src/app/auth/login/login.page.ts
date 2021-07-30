import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormButton } from 'src/app/interfaces/button.interface';
import { FormField } from 'src/app/interfaces/form-field.interface';
import { AuthService } from '../guards/auth.service';
import { Loading } from 'src/app/utils/loading';
import { DOCUMENT } from '@angular/common';
import { Toast } from 'src/app/utils/toast';

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
		private loading: Loading,
		private toast: Toast,
		@Inject(DOCUMENT) private document: Document
	) {
		this.document.addEventListener('keydown', (event: any) => {
			if(event.key === 'Enter') {
				this.signIn();
			}
		});
	}

	public async signIn(): Promise<void> {
		const { email, password } = this.loginForm.value;

		try {
			await this.loading.default();

			await this.authService.signIn(email.trim(), password);

			this.router.navigate(['/home'], { replaceUrl: true });
		} catch (err) {
			await this.toast.show('Email ou Senha inválidos!', 2000, 'danger');
		}

		await this.loading.hidde();
	}

	public redirectToRegister(): void {
		this.router.navigate(['/cadastro'], { replaceUrl: true });
	}
}
