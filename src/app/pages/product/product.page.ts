import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Loading } from 'src/app/utils/loading';
import { IProduct } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { Toast } from 'src/app/utils/toast';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html'
})
export class ProductPage {
	public productsList: Array<IProduct>;
	public showDistance: boolean = false;

	constructor(
		private productService: ProductService,
		private loading: Loading,
		private router: Router,
		private toast: Toast
	) { }

	async ionViewWillEnter() {
		try {
			await this.loading.default();
			this.productsList = await this.productService.getProductById();
		} catch (err) {
			this.toast.show('Erro ao buscar seus produtos', 2000, 'danger');
		}

		await this.loading.hidde();
	}

	public addProduct(): void {
		this.router.navigate(['/addProduct'], { replaceUrl: true });
	}
}
