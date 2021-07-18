import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Photo } from '../interfaces/photo.interface';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
	public photo: Photo;

	constructor(private sanitizer: DomSanitizer) { }

	public async addNewPhoto() {
		const capturedPhoto = await Camera.getPhoto({
			resultType: CameraResultType.Base64,
			source: CameraSource.Camera,
			quality: 70
		});

		this.photo = {
			webviewPath: this.sanitizer
				.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${capturedPhoto.base64String}`),
			imgInBase64: capturedPhoto.base64String
		};
	}
}
