import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'src/environments/environment';
import { AuthTokenService } from 'src/app/services/auth-token.service';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { LocalStorage } from 'src/app/services/localStorage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

	constructor(
		private httpClient: HttpClient,
		private authTokenService: AuthTokenService,
		private userService: UserService,
		private tokenService: AuthTokenService,
		private storage: LocalStorage
	) {}

	public isAuthenticated(): string | undefined {
        return this.tokenService.getToken();
    }

	public logout(): void {
		this.storage.clearAll();
	}

	public async signUp(newUser: any): Promise<void> {
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

			// Salva o token
			this.authTokenService.saveToken(response.accessToken);

			// Salva os Dados do Usuário
			this.userService.saveCurrentUser(this.authTokenService.decodePayloadJWT());
		} catch (err) {
			throw Error('Email ou Senha Inválidos!');
		}
    }
}

interface IToken {
	accessToken: string;
}
