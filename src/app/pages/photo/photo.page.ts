import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { FormButton } from 'src/app/interfaces/button.interface';
import { FormField } from 'src/app/interfaces/form-field.interface';
import { ProductService } from 'src/app/services/product.service';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-phot',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss']
})
export class PhotoPage implements OnDestroy {

	public productForm: FormGroup = this.formBuilder.group({
		title: '',
		market_name: '',
		price: '',
		isPromotional: false
	});

	public formFields: Array<FormField> = [
		{
			type: 'text',
			placeholder: 'Nome do Produto',
			formControlName: 'title'
		},
		{
			type: 'text',
			placeholder: 'Nome do Mercado',
			formControlName: 'market_name'
		},
		{
			type: 'number',
			placeholder: 'Preço',
			formControlName: 'price'
		},
		{
			label: 'Produto em Promoção',
			type: 'checkbox',
			formControlName: 'isPromotional'
		}
	];

	public formButtons: Array<FormButton> = [
		{
			label: 'Tirar foto do produto',
			onClick: () => this.addPhoto(),
		},
		{
			label: 'Salvar',
			onClick: () => this.addProduct()
		}
	];

	constructor(
		public photoService: PhotoService,
		private formBuilder: FormBuilder,
		private productService: ProductService,
		private toastController: ToastController,
		private loadingController: LoadingController
	) {}

	public addPhoto(): void {
		this.photoService.addNewPhoto();
	}

	public async addProduct(): Promise<void> {
		const product = {
			...this.productForm.value,
			image: this.photoService.photo.imgInBase64
		};

		try {

			const loading = await this.loadingController.create({
				message: 'Salvando...',
				duration: 30000
			});
			await loading.present();

			await this.productService.addProduct(product);

			loading.dismiss();

			// Limpar dados do form e da imagem
			this.clearAllData();

			const toast = await this.toastController.create({
				message: 'Usuário Cadastrado com Sucesso!',
				duration: 3000,
				color: 'success'
			});
			toast.present();
		} catch (error) {
			const toast = await this.toastController.create({
				message: 'Dados Inválidos!',
				duration: 2000,
				color: 'danger'
			});
			toast.present();
		}
	}

	ngOnDestroy(): void {
		this.photoService.photo = null;
	}

	private clearAllData(): void {
		this.productForm.reset();
		this.photoService.photo = null;
	}
}
