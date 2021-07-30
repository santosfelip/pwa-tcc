import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/environments/environment';
import { Location, ILocation } from '../libraries/Location';
import { AuthTokenService } from './auth-token.service';
import { UserService } from './user.service';

export interface IProduct {
	title: string;
	marketName: string;
	price: number;
	isPromotional: boolean;
	image: string;
	brandName: string;
	distance?: string;
	uid?: string;
};

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	constructor(
		private httpClient: HttpClient,
		private authTokenService: AuthTokenService,
		private userService: UserService
	){}

	public async addProduct(product: IProduct): Promise<void> {
		const endpoint: string = `${API.v1}/product`;
		const token: string = this.authTokenService.getToken();

		try {
			const locationUser: ILocation | null = await Location.getLocationInfo();

			const productToSave = {
				...product,
				...locationUser,
				uid: this.authTokenService.decodePayloadJWT().userId
			};

			const headers: HttpHeaders = new HttpHeaders({
                authorization: `Bearer ${token}`
            });
			await this.httpClient.post(endpoint, productToSave, { headers }).toPromise();
		} catch (error) {
			throw new Error('Erro ao Salvar os Produtos');
		}
	}

	public async getAllProducts(): Promise<any> {
		const token: string = this.authTokenService.getToken();
		const { userId } = this.userService.currentUser;

		try {
			const endpoint: string = `${API.v1}/products/${userId}`;

			const headers: HttpHeaders = new HttpHeaders({
                authorization: `Bearer ${token}`
            });

			return await this.httpClient.get(endpoint, { headers }).toPromise();
		} catch (error) {
			throw new Error('Erro ao buscar os produtos!');
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
