import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

	constructor(private formBuilder: FormBuilder) { }

	ngOnInit() {
	}

}
