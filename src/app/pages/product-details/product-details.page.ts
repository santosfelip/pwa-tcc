import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
	private productId: string;

	constructor(
		private route: Router,
		private activeRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.productId = this.activeRoute.snapshot.paramMap.get('productId');
	}

	public redirectHome(): void {
		this.route.navigate(['/home'], { replaceUrl: true });
	}

	public addNewComment(): void {
		console.log('TODO');
	}
}
