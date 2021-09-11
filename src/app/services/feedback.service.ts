import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/environments/environment';
import { Points } from '../components/enums/points.enum';
import { AuthTokenService } from './auth-token.service';
import { LocalStorage } from './localStorage.service';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root'
})
export class FeedBackService {
	constructor(
		private httpClient: HttpClient,
		private authTokenService: AuthTokenService,
		private userService: UserService,
		private storage: LocalStorage
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

			// Atualiza o array de curtidas pro usuário não ficar ganhando pontos pelo mesmo produto
			const feedBacks = this.getFeedbacksId() || [];
			if(!feedBacks.includes(productId)) {
				feedBacks.push(productId);
				this.setFeedbacksId(feedBacks);

				// Salva o ponto da ação do usuário
				await this.userService.savePoints(Points.FEEDBACK);
			}
		} catch (error) {
			throw Error('Erro ao salvar feedback');
		}
	}

	public setFeedbacksId(feedBacks: Array<string>) {
		this.storage.setItemData('feedbacks', feedBacks);
	}

	public getFeedbacksId() {
		return this.storage.getItemData('feedbacks');
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
