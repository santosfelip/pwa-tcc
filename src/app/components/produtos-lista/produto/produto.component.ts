import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss'],
})
export class ProdutoComponent {
	@Input() image: string;
	@Input() price: number;
	@Input() marketName: string;
	@Input() productName: string;
	@Input() isPromotional: boolean;
	@Input() distance: string;
	@Input() showDistance: boolean;

	public classCss: string;
	constructor() {
		this.classCss = !this.showDistance ? 'not-distance' : 'show-distance';
	}
}
