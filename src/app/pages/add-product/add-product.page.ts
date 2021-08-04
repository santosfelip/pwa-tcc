import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormButton } from 'src/app/interfaces/button.interface';
import { FormField } from 'src/app/interfaces/form-field.interface';
import { ProductService } from 'src/app/services/product.service';
import { Loading } from 'src/app/utils/loading';
import { Toast } from 'src/app/utils/toast';
import categories from '../../utils/categories.json';

@Component({
  selector: 'app-phot',
  templateUrl: './add-product.page.html'
})
export class AddProductPage {

	public productForm: FormGroup = this.formBuilder.group({
		title: '',
		marketName: '',
		price: '',
		brand: '',
		isPromotional: false,
		city: '',
		stateCode: '',
		category: ''
	});

	public formFields: Array<FormField> = [
		{
			type: 'text',
			placeholder: 'Nome do Produto',
			formControlName: 'title'
		},
		{
			type: 'text',
			placeholder: 'Marca',
			formControlName: 'brand'
		},
		{
			type: 'select',
			placeholder: 'Categoria',
			formControlName: 'category',
			options: categories.categoriesSelect
		},
		{
			type: 'autocompleteMaps',
			placeholder: 'Nome do Mercado',
			formControlName: 'marketName'
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
			label: 'Salvar',
			onClick: () => this.addProduct()
		}
	];

	constructor(
		private formBuilder: FormBuilder,
		private productService: ProductService,
		private loading: Loading,
		private toast: Toast
	) {}

	public async addProduct(): Promise<void> {
		try {
			await this.loading.show('Salvando...', 30000);

			await this.productService.addProduct(this.productForm.value);

			// Limpar dados do Form
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

	private clearAllData(): void {
		this.productForm.setValue({
			title: '',
			marketName: '',
			price: '',
			brand: '',
			isPromotional: false,
			city: '',
			stateCode: '',
			category: ''
		});
	}
}
