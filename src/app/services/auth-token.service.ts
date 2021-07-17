import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { IUser } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

	public decodePayloadJWT(): IUser | null {
		try {
			const tokenDecoded: any = jwt_decode(this.getToken());

			return {
				userId: tokenDecoded.id_user,
				name: tokenDecoded.name,
				email: tokenDecoded.email
			};
		} catch (Error) {
			return null;
		}
	}

	public saveToken(token: string): void {
		localStorage.setItem('token', token);
	}

	public getToken(): string {
		return localStorage.getItem('token');
	}
}
