import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormButton } from 'src/app/interfaces/button.interface';
import { FormField } from 'src/app/interfaces/form-field.interface';

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
			onClick: () => this.redirectToHome()
		}
	];

	constructor(private formBuilder: FormBuilder, private router: Router) { }

	ngOnInit() {
	}

	public redirectToHome(): void {
		this.router.navigate(['/home'], { replaceUrl: true });
	}
}
