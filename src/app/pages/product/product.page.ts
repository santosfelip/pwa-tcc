import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Loading } from 'src/app/utils/loading';
import { IProduct } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html'
})
export class ProductPage {
	public productsList: Array<IProduct>;
	public showDistance: boolean = false;

	constructor(
		private productService: ProductService,
		private loading: Loading
	) { }

	async ionViewWillEnter() {
		try {
			await this.loading.default();
			this.productsList = await this.productService.getProductById();
		} catch (err) {
			console.log(err);
		}

		await this.loading.hidde();
	}
}
