import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html'
})
export class LoginPage implements OnInit {
	public loginForm: FormGroup = this.formBuilder.group({
		email: '',
		password: ''
	});

    constructor(
		private formBuilder: FormBuilder,
		private router: Router) { }

    ngOnInit() {
    }

	public redirectToHome(): void {
		this.router.navigate(['/home'], { replaceUrl: true });
	}

}
