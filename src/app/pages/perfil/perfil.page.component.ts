import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormButton } from 'src/app/interfaces/button.interface';
import { FormField } from 'src/app/interfaces/form-field.interface';
import { UserService } from 'src/app/services/user.service';
import { HandleError } from 'src/app/utils/handleError';
import { Loading } from 'src/app/utils/loading';
import { Toast } from 'src/app/utils/toast';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html'
})
export class PerfilPage implements OnInit {

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

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private userService: UserService,
		private loading: Loading,
		private toast: Toast
	) { }

	ngOnInit() {
		console.log(this.registerForm);
		this.registerForm.setValue({
			name: this.userService.getCurrentUser().name,
			email: this.userService.getCurrentUser().email,
			password: '',
			// Valores defaults adicionados no Componente Select-Sate-City
			city: '',
			stateCode: ''
		});
	}

	public async editUser(): Promise<void> {
		const user: any = this.registerForm.value;
		user.uid = this.userService.getCurrentUser().uid;

		try {
			if(!this.registerForm.valid) {
				throw Error('Preencha os Campos Corretamente');
			}

			await this.loading.show('Salvando...', 5000);

			await this.userService.editUser(user);

			await this.toast.show('Usuário Alterado com Sucesso!', 2000, 'success');

			this.router.navigate(['/home'], { replaceUrl: true });
		} catch (err) {
			await this.toast.show(HandleError.getMessageError(err), 2000, 'danger');
		}

		await this.loading.hidde();
	}
}
