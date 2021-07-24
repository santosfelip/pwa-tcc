import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'src/environments/environment';
import { AuthTokenService } from 'src/app/services/auth-token.service';
import { IUser } from 'src/app/interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private currentUserAuthenticated: IUser | null;

	constructor(
		private httpClient: HttpClient,
		private authTokenService: AuthTokenService
		) {}

	public isAuthenticated(): IUser | null {
        return this.currentUserAuthenticated;
    }

	public logout(): void {
		this.currentUserAuthenticated = null;
		this.authTokenService.saveToken('');
	}

	public async signUp(newUser: IUser): Promise<void> {
		const endpoint: string = `${API.v1}/user/register`;

		try {
			await this.httpClient.post(endpoint, newUser).toPromise();
		} catch (err) {
			let message = 'Dados Inválido!';
			if(typeof err?.error?.data === 'string') {
				message =  err?.error?.data;
			}

			throw Error(message);
		}
	}

    public async signIn(email: string, password: string): Promise<void> {
		const endpoint: string = `${API.v1}/auth`;
		const user = {
			email,
			password
		};

		try {
			const response: IToken = await this.httpClient.post(endpoint, user).toPromise() as IToken;
			// Salva o token no Local Storage
			this.authTokenService.saveToken(response.accessToken);
			this.saveCurrentUser();
		} catch (err) {
			throw Error('Email ou Senha Inválidos!');
		}
    }

	private saveCurrentUser(): void {
		this.currentUserAuthenticated = this.authTokenService.decodePayloadJWT();
	}

}

interface IToken {
	accessToken: string;
}
