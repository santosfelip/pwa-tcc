import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormButton } from 'src/app/interfaces/button.interface';
import { FormField } from 'src/app/interfaces/form-field.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { AuthTokenService } from 'src/app/services/auth-token.service';
import { UserService } from 'src/app/services/user.service';
import { Loading } from 'src/app/utils/loading';
import { Toast } from 'src/app/utils/toast';

@Component({
  selector: 'app-perfilt',
  templateUrl: './perfil.page.html'
})
export class PerfilPage implements OnInit {

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
			placeholder: 'Nova Senha',
			formControlName: 'password'
		}
	];

	public formButtons: Array<FormButton> = [
		{
			label: 'Salvar',
			onClick: () => this.editUser()
		}
	];

	private currentUser: IUser;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private userService: UserService,
		private tokenService: AuthTokenService,
		private loading: Loading,
		private toast: Toast
	) { }

	ngOnInit() {
		this.currentUser = this.tokenService.decodePayloadJWT();
		this.registerForm.setValue({
			name: this.currentUser.name,
			email: this.currentUser.email,
			password: ''
		});
	}

	public async editUser(): Promise<void> {
		const user: IUser = this.registerForm.value;
		user.userId = this.currentUser.userId;

		try {
			await this.loading.show('Salvando...', 5000);

			await this.userService.editUser(user);

			await this.toast.show('Usuário Alterado com Sucesso!', 2000, 'success');

			this.router.navigate(['/home'], { replaceUrl: true });
		} catch (err) {
			let message = 'Dados Inválido!';
			if(typeof err?.error?.data === 'string') {
				message =  err?.error?.data;
			}

			await this.toast.show(message, 2000, 'danger');
		}

		await this.loading.hidde();
	}
}
