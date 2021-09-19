import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/environments/environment';
import { AuthTokenService } from './auth-token.service';
import { UserService } from './user.service';
import { HandleError } from '../utils/handleError';

export interface IComment {
	uid: string;
	productId: string;
	message: string;
	userName: string;
};

@Injectable({
	providedIn: 'root'
})
export class CommentService {
	constructor(
		private httpClient: HttpClient,
		private authTokenService: AuthTokenService,
		private userService: UserService
	){}

	public async getCommentByProductId(productId: string): Promise<Array<IComment> | undefined> {
		try {
			const endpoint: string = `${API.v1}/comment/${productId}`;
			const response: Array<IComment> =
				await this.httpClient.get(endpoint, { headers: this.getHeader() }).toPromise() as Array<IComment>;

				return response;
		} catch (err) {
			throw Error(HandleError.getMessageError(err));
		}
	}

	public async addComment(productId: string, message: string): Promise<void> {
		try {
			const endpoint: string = `${API.v1}/comment`;

			const { uid, name } = this.userService.getCurrentUser();
			const comment: IComment = {
				productId,
				message,
				uid,
				userName: name
			};

			await this.httpClient.post(endpoint, comment, { headers: this.getHeader() }).toPromise();
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
