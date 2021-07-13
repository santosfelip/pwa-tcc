import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-phot',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss']
})
export class PhotoPage {
	public productForm: FormGroup = this.formBuilder.group({
		nameProduct: '',
		nameMarket: '',
		price: '',
		isPromotion: false
	});
	constructor(
		public photoService: PhotoService,
		private formBuilder: FormBuilder
	) {}

	public addPhotoToGallery(): void {
		this.photoService.addNewToGallery();
	}

	public addProduct(): void {
		console.log(this.productForm);
	}
}
