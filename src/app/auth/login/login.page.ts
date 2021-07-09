import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	public loginForm: FormGroup = this.formBuilder.group({
		email: '',
		password: ''
	});

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
    }

}
