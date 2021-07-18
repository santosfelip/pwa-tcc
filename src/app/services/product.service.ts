import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/environments/environment';
import { AuthTokenService } from './auth-token.service';

export interface IProduct {
	title: string;
	market_name: string;
	price: number;
	isPromotional: boolean;
	image: string;
}

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	constructor(
		private httpClient: HttpClient,
		private authTokenService: AuthTokenService
	){}

	public async addProduct(product: IProduct): Promise<void> {
		const endpoint: string = `${API.v1}/product`;
		const token: string = this.authTokenService.getToken();

		try {
			const productToSave = {
				...product,
				uid: this.authTokenService.decodePayloadJWT().userId,
				location: {
					latitude: -120,
					longitude: 140
				}
			};

			const headers: HttpHeaders = new HttpHeaders({
                authorization: `Bearer ${token}`
            });
			await this.httpClient.post(endpoint, productToSave, { headers }).toPromise();
		} catch (error) {
			throw new Error('Erro');
		}
	}
}
