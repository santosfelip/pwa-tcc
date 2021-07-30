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

	constructor(
		private router: Router,
		private productService: ProductService,
		private loading: Loading,
		private toast: Toast
	) { }

	async ionViewWillEnter() {
		try {
			await this.loading.show('Buscando Produtos em sua Cidade...', 50000);

			this.productsList = await this.productService.getAllProducts();
		} catch (err) {
			this.toast.show('Não foi possível obter a sua localização!', 2000, 'danger');
		}

		await this.loading.hidde();
	}

	public redirectToAddProduct(): void {
		this.router.navigate(['/addProduct'], { replaceUrl: true });
	}
}
