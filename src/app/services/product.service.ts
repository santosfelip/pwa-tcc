import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/environments/environment';
import { AuthTokenService } from './auth-token.service';
import { LocalStorage } from './localStorage.service';
import { UserService } from './user.service';
import { HandleError } from '../utils/handleError';
import { Points } from '../components/enums/points.enum';

export interface IProduct {
	productId: string;
	likes: number;
	title: string;
	marketName: string;
	price: number;
	isPromotional: boolean;
	isFeedBack: boolean;
	isLiked: boolean;
	image: string;
	brandName: string;
	category: string;
	uid?: string;
	creat_at: any;
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
			if(!product.stateCode || !product.city) {
				product.stateCode = currentUser.stateCode;
				product.city = currentUser.city;
			}

			if(currentUser.stateCode !== product.stateCode ||
				currentUser.city !== product.city) {
				throw new Error('Localização do Produto diferente da Atual');
			}
			const productToSave = {
				...product,
				category: product?.category.trim(),
				uid: this.authTokenService.decodePayloadJWT().uid
			};

			await this.httpClient.post(endpoint, productToSave, { headers: this.getHeader() }).toPromise();

			// Salva o ponto da ação do usuário
			await this.userService.savePoints(Points.ADD_PRODUCT);
		} catch (err) {
			throw Error(HandleError.getMessageError(err));
		}
	}

	public async deleteProduct(productId: string): Promise<void> {
		const endpoint: string = `${API.v1}/product/${productId}`;

		try {
			await this.httpClient.delete(endpoint, { headers: this.getHeader() }).toPromise();
		} catch (err) {
			throw Error(HandleError.getMessageError(err));
		}
	}


	public async getAllProducts(): Promise<any> {
		const { uid } = this.storage.getItemData('userData');
		const endpoint: string = `${API.v1}/products/${uid}`;

		try {

			return await this.httpClient.get(endpoint, { headers: this.getHeader() }).toPromise();
		} catch (err) {
			throw Error(HandleError.getMessageError(err));
		}
	}

	public async getProductsByCategories(categories: Array<any>): Promise<any> {
		let params = new HttpParams();

		categories.forEach((category: any) =>{
			params = params.append('categories[]', category?.label);
		});

		const { uid } = this.storage.getItemData('userData');
		const endpoint: string = `${API.v1}/products/${uid}`;

		try {

			return await this.httpClient.get(endpoint, { headers: this.getHeader(), params }).toPromise();
		} catch (err) {
			throw Error(HandleError.getMessageError(err));
		}
	}

	public async getProductByUserId(): Promise<any> {
		const { uid } = this.storage.getItemData('userData');
		const endpoint: string = `${API.v1}/products/user/${uid}`;

		try {

			return await this.httpClient.get(endpoint, { headers: this.getHeader() }).toPromise();
		} catch (err) {
			throw Error(HandleError.getMessageError(err));
		}
	}

	public async getProductByProductId(productId: string): Promise<any> {
		const endpoint: string = `${API.v1}/product/${productId}`;

		try {

			return await this.httpClient.get(endpoint, { headers: this.getHeader() }).toPromise();
		} catch (err) {
			throw Error(HandleError.getMessageError(err));
		}
	}

	public async addProductInPurchaseList(productId: string): Promise<void> {
		try {
			const currentUser = this.userService.getCurrentUser();

			currentUser.purchaseList = [
				...currentUser?.purchaseList,
				productId
			];

			await this.userService.editUser(currentUser);
		} catch (err) {
			throw Error(HandleError.getMessageError(err));
		}
	}

	public async getPurchaseList(): Promise<any> {
		try {
			const { uid } = this.userService.getCurrentUser();
			const endpoint: string = `${API.v1}/products/purchase-list/${uid}`;

			return await this.httpClient.get(endpoint, { headers: this.getHeader() }).toPromise();
		} catch (err) {
			throw Error(HandleError.getMessageError(err));
		}

	}

	private getHeader(): HttpHeaders {
		return new HttpHeaders({
            authorization: `Bearer ${this.authTokenService.getToken()}`
        });
	}
}
