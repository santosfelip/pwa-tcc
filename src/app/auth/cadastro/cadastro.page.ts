import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormButton } from 'src/app/interfaces/button.interface';
import { FormField } from 'src/app/interfaces/form-field.interface';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html'
})
export class CadastroPage implements OnInit {
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
			onClick: () => this.redirectToLogin()
		},
		{
			label: 'Entre',
			onClick: () => this.redirectToLogin()
		}
	];

	constructor(private formBuilder: FormBuilder, private router: Router) { }

	ngOnInit() {
	}

	public redirectToLogin(): void {
		this.router.navigate(['/login'], { replaceUrl: true });
	}
}
