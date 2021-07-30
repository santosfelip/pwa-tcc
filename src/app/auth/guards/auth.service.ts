import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'src/environments/environment';
import { AuthTokenService } from 'src/app/services/auth-token.service';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { Location, ILocation } from 'src/app/libraries/Location';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

	constructor(
		private httpClient: HttpClient,
		private authTokenService: AuthTokenService,
		private userService: UserService
	) {}

	public isAuthenticated(): IUser | null {
        return this.userService.currentUser;
    }

	public logout(): void {
		this.userService.currentUser = null;
		this.authTokenService.saveToken('');
	}

	public async signUp(newUser: IUser): Promise<void> {
		const endpoint: string = `${API.v1}/user/register`;

		try {
			const locationUser: ILocation | null = await Location.getLocationInfo();

			const userToSave = {
				...locationUser,
				...newUser
			};

			await this.httpClient.post(endpoint, userToSave).toPromise();
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

			// Atualiza a Localização do usuário no BD
			this.userService.saveLocation();

			// Salva o token
			this.authTokenService.saveToken(response.accessToken);

			// Salva os Dados do Usuário
			this.userService.currentUser = this.authTokenService.decodePayloadJWT();
		} catch (err) {
			throw Error('Email ou Senha Inválidos!');
		}
    }
}

interface IToken {
	accessToken: string;
}
