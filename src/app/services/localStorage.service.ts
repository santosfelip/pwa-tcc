import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LocalStorage {

	public setItemData(id: string, data: any): void {
		localStorage.setItem(id, JSON.stringify(data));
	}

	public getItemData(id: 'token' | 'userData' | 'locationData'): any {
		return JSON.parse(localStorage.getItem(id));
	}

	public clearAll(): void {
		localStorage.clear();
	}
}
