import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/environments/environment';
import { IUser } from '../interfaces/user.interface';
import { ILocation } from '../libraries/Location';
import { AuthTokenService } from './auth-token.service';
import { Location } from '../libraries/Location';
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

			this.saveCurrentUser(response);
		} catch (err) {
			throw Error('Falha na Requisição!');
		}
	}

	public async updateLocationUser(): Promise<void> {
		try {
			// Recebe a Localização do usuário
			const newLocation = await Location.getLocationInfo();

			await this.editUser(newLocation);
		} catch (error) {
			throw Error('Falha na Requisição!');
		}
	}

	public saveCurrentUser(user): void {
		this.storage.setItemData('userData', user);
	}

	public getCurrentUser(): any {
		return this.storage.getItemData('userData');
	}
}
