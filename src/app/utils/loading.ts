import { LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Loading {
	private loadingElement: HTMLIonLoadingElement;

	constructor(private loadingController: LoadingController,
		){}

	public async show(message: string, duration: number = 30000): Promise<void> {
		this.loadingElement = await this.loadingController.create({
			message,
			duration
		});
		await this.loadingElement.present();
	}

	public async hidde(): Promise<void> {
		await this.loadingElement?.dismiss();
	}

	public async default(): Promise<void> {
		await this.show('Carregando...');
	}
}
