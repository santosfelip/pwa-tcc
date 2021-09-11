import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormButton } from 'src/app/interfaces/button.interface';
import { FormField } from 'src/app/interfaces/form-field.interface';
import { HandleError } from 'src/app/utils/handleError';
import { Loading } from 'src/app/utils/loading';
import { Toast } from 'src/app/utils/toast';
import { AuthService } from '../guards/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html'
})
export class CadastroPage {
	public registerForm: FormGroup = this.formBuilder.group({
		name: ['', [Validators.required]],
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(6)]],
		city: ['', [Validators.required]],
		stateCode: ['', [Validators.required]]
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
			label: 'Voltar',
			onClick: () => this.redirectToLogin()
		}
	];

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private loading: Loading,
		private toast: Toast
	) { }

	public redirectToLogin(): void {
		this.router.navigate(['/login'], { replaceUrl: true });
	}

	public async signUp(): Promise<void> {
		const newUser = {
			...this.registerForm.value,
			email: this.registerForm.value.email.trim()
		};

		try {
			if(!this.registerForm.valid) {
				throw Error('Preencha todos os Campos Corretamente');
			}

			await this.loading.show('Salvando...', 5000);

			await this.authService.signUp(newUser);

			await this.toast.show('Usuário Cadastrado com Sucesso!', 3000);

			await this.loading.hidde();
			await this.signIn(this.registerForm.value);
		} catch (err) {
			await this.toast.show(HandleError.getMessageError(err), 2000, 'danger');
		}

		await this.loading.hidde();
	}

	public async signIn({ email, password }): Promise<void> {
		try {
			await this.loading.show('Carregando...', 5000);
			await this.authService.signIn(email.trim(), password);

			this.router.navigate(['/welcome'], { replaceUrl: true });
		} catch (err) {
			await this.toast.show(HandleError.getMessageError(err), 2000, 'danger');
		}

		await this.loading.hidde();
	}
}
