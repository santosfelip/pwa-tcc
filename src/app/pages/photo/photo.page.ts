import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormButton } from 'src/app/interfaces/button.interface';
import { FormField } from 'src/app/interfaces/form-field.interface';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-phot',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss']
})
export class PhotoPage {

	public disable = true;
	public productForm: FormGroup = this.formBuilder.group({
		nameProduct: '',
		nameMarket: '',
		price: '',
		isPromotion: false
	});

	public formFields: Array<FormField> = [
		{
			type: 'text',
			placeholder: 'Nome do Produto',
			formControlName: 'nameProduct'
		},
		{
			type: 'text',
			placeholder: 'Nome do Mercado',
			formControlName: 'nameMarket'
		},
		{
			type: 'number',
			placeholder: 'Preço',
			formControlName: 'price'
		},
		{
			label: 'Produto em Promoção',
			type: 'checkbox',
			formControlName: 'isPromotion'
		}
	];

	public formButtons: Array<FormButton> = [
		{
			label: 'Tirar foto do produto',
			onClick: () => this.addPhotoToGallery(),
		},
		{
			label: 'Salvar',
			onClick: () => this.addProduct()
		}
	];

	constructor(
		public photoService: PhotoService,
		private formBuilder: FormBuilder
	) {

		console.log(!!this.photoService.photo);
		console.log(!this.photoService.photo);
	}

	public addPhotoToGallery(): void {
		this.photoService.addNewToGallery();
		this.disable = false;
	}

	public addProduct(): void {
		console.log(this.productForm);
	}
}
