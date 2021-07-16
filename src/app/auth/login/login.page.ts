import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormButton } from 'src/app/interfaces/button.interface';
import { FormField } from 'src/app/interfaces/form-field.interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html'
})
export class LoginPage implements OnInit {
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
			onClick: () => this.redirectToHome()
		},
		{
			label: 'Cadastre-se',
			onClick: () => this.redirectToRegister()
		}
	];

    constructor(
		private formBuilder: FormBuilder,
		public router: Router) { }

    ngOnInit() {
    }

	public redirectToHome(): void {
		this.router.navigate(['/home'], { replaceUrl: true });
	}

	public redirectToRegister(): void {
		this.router.navigate(['/cadastro'], { replaceUrl: true });
	}

}
