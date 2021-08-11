import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Loading } from 'src/app/utils/loading';
import { IProduct } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { Toast } from 'src/app/utils/toast';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html'
})
export class ProductPage {
	public productsList: Array<IProduct>;
	public showDistance: boolean = false;
	public arrayLikes: Array<string>;
	public notFound: boolean = false;

	constructor(
		private productService: ProductService,
		private loading: Loading,
		private router: Router,
		private toast: Toast,
		private eventService: EventService
	) { }

	async ionViewWillEnter() {
		await this.getProducts();
		this.notFound = !this.productsList?.length;
	}

	public addProduct(): void {
		this.router.navigate(['/addProduct'], { replaceUrl: true });
	}

	public async deleteProduct(productId: string): Promise<void> {
		try {
			await this.loading.show('Excluindo Produto...', 3000);

			await this.productService.deleteProduct(productId);

			await this.loading.hidde();
			await this.getProducts();
		} catch (error) {
			await this.loading.hidde();

			throw Error('Erro ao excluir Produto!');
		}
	}

	private async getProducts(): Promise<void> {
		try {
			await this.loading.default();
			await this.getLikes();

			const response = await this.productService.getProductById();
			this.productsList = this.formatProductData(response);
		} catch (err) {
			this.toast.show('Não foi possível localizar os Produtos!', 2000, 'danger');
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
