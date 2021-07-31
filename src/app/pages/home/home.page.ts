import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Loading } from 'src/app/utils/loading';
import { IProduct } from 'src/app/services/product.service';
import { Toast } from 'src/app/utils/toast';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
	public productsList: Array<IProduct>;
	public showDistance: boolean = true;
	public categoriesList = [
		{
			outiline: true,
			color: 'primary',
			label: 'Produtos Recomendados'
		},
		{
			outiline: true,
			color: 'primary',
			label: 'Categoria 2'
		},
		{
			outiline: true,
			color: 'primary',
			label: 'Categoria 3'
		},
		{
			outiline: true,
			color: 'primary',
			label: 'Categoria 4'
		}
	];

	public categoriesListClicked = [];
	constructor(
		private router: Router,
		private productService: ProductService,
		private loading: Loading,
		private toast: Toast
	) { }

	async ionViewWillEnter() {
		await this.getProducts('Buscando Produtos em sua Cidade...');
	}

	public redirectToAddProduct(): void {
		this.router.navigate(['/addProduct'], { replaceUrl: true });
	}

	public async addCategorie(id: number): Promise<void> {
		const categorieSelected = {
			id,
			label: this.categoriesList[id].label,
			icon: true
		};

		const isSaved = this.categoriesListClicked.find(categorie => categorie.id === categorieSelected.id);
		if(!isSaved) {
			if(id === 0) {
				this.productsList = await this.productService.getRecommendations();
			}

			this.categoriesListClicked.push(categorieSelected);
		}
	}

	public async removeCategorie(id: number): Promise<void> {
		if(this.categoriesListClicked[id].id === 0) {
			this.productsList = await this.productService.getAllProducts();
		}
		this.categoriesListClicked.splice(id, 1);
	}

	private async getProducts(messageLoad: string): Promise<void> {
		try {
			await this.loading.show(messageLoad, 50000);

			this.productsList = await this.productService.getAllProducts();
		} catch (err) {
			this.toast.show('Não foi possível obter a sua localização!', 2000, 'danger');
		}

		await this.loading.hidde();
	}
}
