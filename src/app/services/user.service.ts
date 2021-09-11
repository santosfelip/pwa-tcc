import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/environments/environment';
import { IUser } from '../interfaces/user.interface';
import { AuthTokenService } from './auth-token.service';
import { LocalStorage } from './localStorage.service';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	constructor(
		private httpClient: HttpClient,
		private authTokenService: AuthTokenService,
		private storage: LocalStorage
	){}

	public async editUser(newData: any): Promise<void> {
		try {
			const { uid } =  this.authTokenService.decodePayloadJWT();

			const endpoint: string = `${API.v1}/user/${uid}`;
			const token: string = this.authTokenService.getToken();

			const headers: HttpHeaders = new HttpHeaders({
                authorization: `Bearer ${token}`
            });

			const response: any = await this.httpClient.patch(endpoint, newData, { headers }).toPromise();

			await this.saveCurrentUser(response);
		} catch (err) {
			throw Error('Falha na Requisição!');
		}
	}

	public async getAllUserInCity(): Promise<any> {
		try {
			const { uid } =  this.authTokenService.decodePayloadJWT();

			const endpoint: string = `${API.v1}/users/${uid}`;
			const token: string = this.authTokenService.getToken();

			const headers: HttpHeaders = new HttpHeaders({
                authorization: `Bearer ${token}`
            });

			return await this.httpClient.get(endpoint, { headers }).toPromise();
		} catch (err) {
			throw Error('Falha na Requisição!');
		}
	}

	public async savePoints(newPoints: number): Promise<void> {
		try {
			const { points } =  this.getCurrentUser();

			const data = {
				points: Number(points) + newPoints
			};

			await this.editUser(data);
		} catch (error) {
			throw Error('Falha na Requisição!');
		}
	}

	public async saveCurrentUser(user): Promise<void> {
		await this.storage.setItemData('userData', user);
	}

	public getCurrentUser(): any {
		return this.storage.getItemData('userData');
	}
}
