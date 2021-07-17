import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/environments/environment';
import { IUser } from '../interfaces/user.interface';
import { AuthTokenService } from './auth-token.service';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	constructor(
		private httpClient: HttpClient,
		private authTokenService: AuthTokenService){}

	public async editUser(user: IUser): Promise<void> {
		const endpoint: string = `${API.v1}/user/${user.userId}`;
		const token: string = this.authTokenService.getToken();

		try {
			const headers: HttpHeaders = new HttpHeaders({
                authorization: `Bearer ${token}`
            });
			await this.httpClient.patch(endpoint, user, { headers }).toPromise();
		} catch (err) {
			throw Error('Falha na Requisição!');
		}
	}
}
