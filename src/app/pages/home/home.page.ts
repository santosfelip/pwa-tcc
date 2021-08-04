import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Loading } from 'src/app/utils/loading';
import { IProduct } from 'src/app/services/product.service';
import { Toast } from 'src/app/utils/toast';
import { EventService } from 'src/app/services/event.service';
import categories from '../../utils/categories.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
	public productsList: Array<IProduct>;
	public showDistance: boolean = true;
	public arrayLikes: Array<string>;
	public categoriesList = categories.categoriesChip.map((category) => ({
		outiline: true,
		color: 'primary',
		label: category
	}));

	public categoriesListClicked = [];
	constructor(
		private router: Router,
		private productService: ProductService,
		private eventService: EventService,
		private loading: Loading,
		private toast: Toast
	) { }

	async ionViewWillEnter() {
		await this.getProducts();
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
			this.getProducts();
		}
		this.categoriesListClicked.splice(id, 1);
	}

	private async getProducts(): Promise<void> {
		try {
			await this.loading.show('Buscando Produtos em sua Cidade...', 50000);
			await this.getLikes();

			const response = await this.productService.getAllProducts();
			this.productsList = this.isLiked(response);
		} catch (err) {
			this.toast.show('Não foi possível localizar os Produtos!', 2000, 'danger');
		}

		await this.loading.hidde();
	}

	private isLiked(productsData) {
		return productsData.map((product) => {
			const isLiked = this.arrayLikes.includes(product.productId);
			return {
				...product,
				isLiked
			};
		});
	}

	private async getLikes(): Promise<any> {
		try {
			this.arrayLikes = await this.eventService.getLikes();
		} catch (error) {
			this.toast.show('Não foi possível obter a sua localização!', 2000, 'danger');
		}
	}
}
