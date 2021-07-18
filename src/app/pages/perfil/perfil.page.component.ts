import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { FormButton } from 'src/app/interfaces/button.interface';
import { FormField } from 'src/app/interfaces/form-field.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { AuthTokenService } from 'src/app/services/auth-token.service';
import { UserService } from 'src/app/services/user.service';

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
		public toastController: ToastController,
		private loadingController: LoadingController
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

		const loading = await this.loadingController.create({
			message: 'Salvando...',
			duration: 5000
		});
		try {
			await loading.present();

			await this.userService.editUser(user);

			loading.dismiss();

			const toast = await this.toastController.create({
				message: 'Usuário Alterado com Sucesso!',
				duration: 2000,
				color: 'success'
			});
			toast.present();

			this.router.navigate(['/home'], { replaceUrl: true });
		} catch (err) {
			loading.dismiss();
			const toast = await this.toastController.create({
				message: 'Dados Inválidos!',
				duration: 2000,
				color: 'danger'
			});
			toast.present();
		}
	}
}
