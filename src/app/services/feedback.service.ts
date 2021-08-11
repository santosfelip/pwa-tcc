import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/environments/environment';
import { AuthTokenService } from './auth-token.service';

@Injectable({
	providedIn: 'root'
})
export class FeedBackService {
	constructor(
		private httpClient: HttpClient,
		private authTokenService: AuthTokenService
	){}

	public async saveFeedBack(productId: string, action: 'add' | 'remove'): Promise<void> {
		const endpoint = `${API.v1}/feedback`;
		try {
			const { uid } = this.authTokenService.decodePayloadJWT();
			const feedBack = {
				userId: uid,
				action,
				productId
			};

			await this.httpClient.post(endpoint, feedBack, { headers: this.getHeader() }).toPromise();
		} catch (error) {
			throw Error('Erro ao salvar feedback');
		}
	}

	public async getAll(): Promise<any> {
		try {
			const { uid } = this.authTokenService.decodePayloadJWT();
			const endpoint = `${API.v1}/feedbacks/${uid}`;

			return await this.httpClient.get(endpoint, { headers: this.getHeader() }).toPromise();
		} catch (error) {
			throw Error('Erro ao salvar feedback');
		}
	}

	private getHeader(): HttpHeaders {
		return new HttpHeaders({
            authorization: `Bearer ${this.authTokenService.getToken()}`
        });
	}
}
