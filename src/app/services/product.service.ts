import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/environments/environment';
import { Location, ILocation } from '../libraries/Location';
import { AuthTokenService } from './auth-token.service';
import { LocalStorage } from './localStorage.service';
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
	latitude?: number;
	longitude?: number;
};

@Injectable({
	providedIn: 'root'
})
export class ProductService {

	public currentLocation: any;

	constructor(
		private httpClient: HttpClient,
		private authTokenService: AuthTokenService,
		private userService: UserService,
		private storage: LocalStorage
	){}

	public async addProduct(product: IProduct): Promise<void> {
		const endpoint: string = `${API.v1}/product`;

		try {
			const currentUser = this.userService.getCurrentUser();
			const productToSave = {
				...product,
				...this.currentLocation,
				stateCode: currentUser.stateCode,
				city: currentUser.city,
				uid: this.authTokenService.decodePayloadJWT().uid
			};

			await this.httpClient.post(endpoint, productToSave, { headers: this.getHeader() }).toPromise();
		} catch (error) {
			throw new Error('Erro ao Salvar os Produtos');
		}
	}

	public async getAllProducts(): Promise<any> {
		const { uid } = this.storage.getItemData('userData');
		const endpoint: string = `${API.v1}/products/${uid}`;

		try {

			return await this.httpClient.get(endpoint, { headers: this.getHeader() }).toPromise();
		} catch (error) {
			throw new Error('Erro ao buscar os produtos!');
		}
	}

	public async getProductById(): Promise<any> {
		const { uid } = this.storage.getItemData('userData');
		const endpoint: string = `${API.v1}/product/${uid}`;

		try {

			return await this.httpClient.get(endpoint, { headers: this.getHeader() }).toPromise();
		} catch (error) {
			throw new Error('Erro ao buscar os produtos!');
		}
	}

	private getHeader(): HttpHeaders {
		return new HttpHeaders({
            authorization: `Bearer ${this.authTokenService.getToken()}`
        });
	}
}
