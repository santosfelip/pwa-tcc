import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormButton } from 'src/app/interfaces/button.interface';
import { FormField } from 'src/app/interfaces/form-field.interface';
import { ProductService } from 'src/app/services/product.service';
import { Loading } from 'src/app/utils/loading';
import { Toast } from 'src/app/utils/toast';
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
			type: 'autocompleteMaps',
			placeholder: 'Nome do Mercado',
			formControlName: 'market_name'
		},
		{
			type: 'number',
			placeholder: 'Preço',
			formControlName: 'price'
		},
		{
			label: 'Produto em Promoção?',
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
		private loading: Loading,
		private toast: Toast
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
			await this.loading.show('Salvando...', 30000);

			await this.productService.addProduct(product);

			// Limpar dados do form e da imagem
			this.clearAllData();

			await this.toast.show('Produto Cadastrado com Sucesso!', 3000, 'success');
		} catch (err) {
			let message = 'Dados Inválido!';
			if(typeof err?.error?.data === 'string') {
				message =  err?.error?.data;
			}

			await this.toast.show(message, 2000, 'danger');
		}

		await this.loading.hidde();
	}

	ngOnDestroy(): void {
		this.photoService.photo = null;
	}

	private clearAllData(): void {
		this.productForm.setValue({
			title: '',
			market_name: '',
			price: '',
			isPromotional: false
		});
		this.photoService.photo = null;
	}
}
