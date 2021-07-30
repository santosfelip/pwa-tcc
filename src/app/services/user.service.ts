import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/environments/environment';
import { IUser } from '../interfaces/user.interface';
import { ILocation } from '../libraries/Location';
import { AuthTokenService } from './auth-token.service';
import { Location } from '../libraries/Location';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	public location: ILocation;
	public currentUser: IUser;

	constructor(
		private httpClient: HttpClient,
		private authTokenService: AuthTokenService
	){}

	public async editUser(newData: IUser | ILocation): Promise<void> {
		try {
			const { userId } = this.currentUser;

			const endpoint: string = `${API.v1}/user/${userId}`;
			const token: string = this.authTokenService.getToken();

			const headers: HttpHeaders = new HttpHeaders({
                authorization: `Bearer ${token}`
            });

			const response: any = await this.httpClient.patch(endpoint, newData, { headers }).toPromise();

			this.currentUser = {
				userId: response.uid,
				name: response.name,
				email: response.email
			};
		} catch (err) {
			throw Error('Falha na Requisição!');
		}
	}

	public async saveLocation(): Promise<void> {
		try {
			// Recebe a Localização do usuário
			this.location = await Location.getLocationInfo();

			await this.editUser(this.location);
		} catch (error) {
			throw Error('Falha na Requisição!');
		}
	}
}
