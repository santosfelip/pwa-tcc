import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Loading } from 'src/app/utils/loading';
import { IProduct } from 'src/app/services/product.service';
import { Router } from '@angular/router';

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
		private router: Router
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

	public redirectToTakePhoto(): void {
		this.router.navigate(['/photo'], { replaceUrl: true });
	}
}
