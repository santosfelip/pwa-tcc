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

		// Verifica se a categoria já foi selecionada
		const isClicked = this.categoriesListClicked.find(
			categorie => categorie.id === categorieSelected.id
		);
		if(!isClicked) {
			this.categoriesListClicked.push(categorieSelected);
			this.getProductsByCategories();
		}
	}

	public async removeCategorie(id: number): Promise<void> {
		if(this.categoriesListClicked.length === 1) {
			this.getProducts();
		} else {
			this.getProductsByCategories();
		}

		this.categoriesListClicked.splice(id, 1);
	}

	private async getProducts(): Promise<void> {
		try {
			await this.loading.show('Buscando Produtos em sua Cidade...', 50000);
			await this.getLikes();

			const response = await this.productService.getAllProducts();
			this.productsList = this.formatProductData(response);
		} catch (err) {
			this.toast.show('Não foi possível localizar os Produtos!', 2000, 'danger');
		}

		await this.loading.hidde();
	}

	private async getProductsByCategories(): Promise<void> {
		try {
			await this.loading.default();
			await this.getLikes();

			const response = await this.productService.getProductsByCategories(this.categoriesListClicked);
			this.productsList = this.formatProductData(response);
		} catch (err) {
			this.toast.show('Não foi realizar esta requisição!', 2000, 'danger');
		}

		await this.loading.hidde();
	}

	private formatProductData(productsData) {
		return productsData.map((product) => {
			const isLiked = this.arrayLikes.includes(product.productId);

			// Se o período promocional tiver passado de 10 dias
			// o atributo isPromotional é setado em false
			if(
				product.isPromotional &&
				this.isPromotionalPeriod(product?.creat_at, 10)
			) {
				product.isPromotional = false;
			};

			return {
				...product,
				isLiked
			};
		});
	}

	private isPromotionalPeriod(date: any, days: number): boolean {
		// eslint-disable-next-line no-underscore-dangle
		const created = new Date(date._seconds * 1000 * 1000);
		return (created.getDate() - new Date().getDate() <= -days);
	}

	private async getLikes(): Promise<any> {
		try {
			this.arrayLikes = await this.eventService.getLikes();
		} catch (error) {
			this.toast.show('Não foi realizar esta requisição!', 2000, 'danger');
		}
	}
}
