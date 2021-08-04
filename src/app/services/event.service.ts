import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/environments/environment';
import { AuthTokenService } from './auth-token.service';

@Injectable({
	providedIn: 'root'
})
export class EventService {

	constructor(
		private httpClient: HttpClient,
		private authTokenService: AuthTokenService
	){}

	public async saveEvent(event): Promise<void> {
		const endpoint = `${API.v1}/event`;
		try {
			const { uid } = this.authTokenService.decodePayloadJWT();
			const newEvent = {...event, person: uid };

			await this.httpClient.post(endpoint, newEvent, { headers: this.getHeader() }).toPromise();
		} catch (error) {
			throw new Error('Erro ao salvar Evento!');
		}
	}

	public async getLikes(): Promise<any> {
		try {
			const { uid } = this.authTokenService.decodePayloadJWT();
			const endpoint = `${API.v1}/likes/${uid}`;

			return await this.httpClient.get(endpoint, { headers: this.getHeader() }).toPromise();
		} catch (error) {
			throw new Error('Falha na requisição');
		}
	}

	private getHeader(): HttpHeaders {
		return new HttpHeaders({
            authorization: `Bearer ${this.authTokenService.getToken()}`
        });
	}

}
