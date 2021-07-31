import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { IUser } from '../interfaces/user.interface';
import { LocalStorage } from './localStorage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
	constructor(private storage: LocalStorage){}

	public decodePayloadJWT(): any {
		try {
			return jwt_decode(this.getToken());
		} catch (Error) {
			return null;
		}
	}

	public saveToken(token: string): void {
		this.storage.setItemData('token', token);
	}

	public getToken(): string {
		return this.storage.getItemData('token');
	}
}
