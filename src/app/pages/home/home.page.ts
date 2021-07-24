import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Loading } from 'src/app/utils/loading';
import { IProduct } from 'src/app/services/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
	public productsList: Array<IProduct>;
	public showDistance: boolean = true;

	constructor(
		private router: Router,
		private productService: ProductService,
		private loading: Loading
	) { }

	async ionViewWillEnter() {
		try {
			await this.loading.show('Buscando Produtos no raio de 5km...', 30000);

			this.productsList = await this.productService.getAllProducts();
		} catch (err) {
			console.log(err);
		}

		await this.loading.hidde();
	}

	public redirectToTakePhoto(): void {
		this.router.navigate(['/photo'], { replaceUrl: true });
	}
}
