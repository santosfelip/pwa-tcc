import { HttpClient, HttpHeaders } from '@angular/common/http';
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

	private getHeader(): HttpHeaders {
		return new HttpHeaders({
            authorization: `Bearer ${this.authTokenService.getToken()}`
        });
	}

}
