import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

	constructor(private formBuilder: FormBuilder) { }

	ngOnInit() {
	}

}
