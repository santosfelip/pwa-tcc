import { SafeResourceUrl } from '@angular/platform-browser';

export interface Photo {
	webviewPath: SafeResourceUrl;
	imgInBase64: string;
}
