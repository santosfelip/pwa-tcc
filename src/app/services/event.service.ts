import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/environments/environment';
import { AuthTokenService } from './auth-token.service';
import { LocalStorage } from './localStorage.service';
import { UserService } from './user.service';
import { Points } from '../components/enums/points.enum';

@Injectable({
	providedIn: 'root'
})
export class EventService {

	constructor(
		private httpClient: HttpClient,
		private authTokenService: AuthTokenService,
		private userService: UserService,
		private storage: LocalStorage
	){}

	public async saveEvent(event): Promise<void> {
		const endpoint = `${API.v1}/event`;
		try {
			const { uid } = this.authTokenService.decodePayloadJWT();
			const newEvent = {...event, person: uid };

			// Salva o evento de Likes ou Dislikes
			await this.httpClient.post(endpoint, newEvent, { headers: this.getHeader() }).toPromise();


			// Atualiza o array de curtidas pro usuário não ficar ganhando pontos
			// por ficar curtindo ou descurtindo o mesmo produto
			const likes = this.getProductsLikes() || [];
			if(!likes.includes(event.thing)) {
				likes.push(event.thing);
				this.setProductLikes(likes);

				// Salva o ponto da ação do usuário
				await this.userService.savePoints(Points.LIKES);
			}
		} catch (error) {
			throw new Error('Erro ao salvar Evento!');
		}
	}

	public setProductLikes(likes: Array<string>) {
		this.storage.setItemData('likes', likes);
	}

	public getProductsLikes() {
		return this.storage.getItemData('likes');
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
