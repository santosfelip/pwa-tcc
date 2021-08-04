import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/environments/environment';
import { AuthTokenService } from './auth-token.service';
import { LocalStorage } from './localStorage.service';
import { UserService } from './user.service';

export interface IProduct {
	productId: string;
	likes: number;
	title: string;
	marketName: string;
	price: number;
	isPromotional: boolean;
	image: string;
	brandName: string;
	uid?: string;
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

	public async addProduct(product: any): Promise<void> {
		const endpoint: string = `${API.v1}/product`;
		const currentUser = this.userService.getCurrentUser();

		try {
			if(currentUser.stateCode !== product.stateCode ||
				currentUser.city !== product.city) {
				throw new Error('Localização do Produto diferente da Atual!');
			}
			const productToSave = {
				...product,
				category: product?.category.trim(),
				uid: this.authTokenService.decodePayloadJWT().uid
			};

			await this.httpClient.post(endpoint, productToSave, { headers: this.getHeader() }).toPromise();
		} catch (error) {
			throw new Error(error.message);
		}
	}

	public async getAllProducts(): Promise<any> {
		let params = new HttpParams();
		//TODO: Passar as categorias dinamicamente para a API
		['alimentos', 'higiene', 'bebidas', 'produtos recomendados'].forEach((category: string) =>{
			params = params.append(`categories[]`, category);
		});


		const { uid } = this.storage.getItemData('userData');
		const endpoint: string = `${API.v1}/products/${uid}`;

		try {

			return await this.httpClient.get(endpoint, { headers: this.getHeader(), params }).toPromise();
		} catch (error) {
			throw new Error('Erro ao buscar os produtos!');
		}
	}

	public async getRecommendations(): Promise<any> {
		const { uid } = this.storage.getItemData('userData');
		const endpoint: string = `${API.v1}/recommendations/${uid}`;

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
