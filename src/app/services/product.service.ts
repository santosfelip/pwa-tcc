import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/environments/environment';
import { GeoLocation } from '../libraries/geoLocation';
import { AuthTokenService } from './auth-token.service';

export interface IProduct {
	title: string;
	market_name: string;
	price: number;
	isPromotional: boolean;
	image: string;
	distance?: string;
	uid?: string;
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
			const coords = await GeoLocation.getCurrentLocation();

			if(!coords) {
				throw new Error('Não foi possível encontrar a sua localização!');
			};

			const productToSave = {
				...product,
				uid: this.authTokenService.decodePayloadJWT().userId,
				location: {
					latitude: coords.latitude,
					longitude: coords.longitude
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

	public async getAllProducts(): Promise<any> {
		const token: string = this.authTokenService.getToken();

		try {
			const coords = await GeoLocation.getCurrentLocation();
			//TODO: Adicionar por CEP
			const endpoint: string = `${API.v1}/products/${coords.latitude}/${coords.longitude}`;

			const headers: HttpHeaders = new HttpHeaders({
                authorization: `Bearer ${token}`
            });

			return await this.httpClient.get(endpoint, { headers }).toPromise();
		} catch (error) {
			console.log(error);
		}
	}

	public async getProductById(): Promise<any> {
		try {
			const { userId } = this.authTokenService.decodePayloadJWT();
			const endpoint: string = `${API.v1}/product/${userId}`;

			const headers: HttpHeaders = new HttpHeaders({
                authorization: `Bearer ${this.authTokenService.getToken()}`
            });

			return await this.httpClient.get(endpoint, { headers }).toPromise();
		} catch (error) {
			console.log(error);
		}
	}
}
