import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class Toast {
	private toastElement: HTMLIonToastElement;

	constructor(private toastController: ToastController){}

	public async show(message: string, duration: number = 30000, color = 'success'): Promise<void> {
		this.toastElement = await this.toastController.create({
			message,
			duration,
			color
		});

		await this.toastElement.present();
	}

	public async hidde(): Promise<void> {
		await this.toastElement?.dismiss();
	}
}
