import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss'],
})
export class ProdutoComponent implements OnInit{
	@Input() image: string;
	@Input() price: number;
	@Input() marketName: string;
	@Input() productName: string;
	@Input() isPromotional: boolean;
	@Input() distance: string;
	@Input() showDistance: boolean;
	@Input() productId: string;
	@Input() numberLikes: number;
	@Input() isLiked: boolean;
	@Input() category: string;
	@Input() isDelete: boolean;

	@Output() clickedDelete: EventEmitter<string> = new EventEmitter();

	public classCss: string;
	public urlToMaps: string;

	constructor(
		private eventService: EventService,
		private productService: ProductService
	){}

	ngOnInit() {
		this.classCss = !this.showDistance ? 'not-distance' : 'show-distance';
		const codedNameMarket = this.marketName.replace(' ','+');

		this.urlToMaps = `https://www.google.com/maps/search/?api=1&query=${codedNameMarket}`;
	}

	public async changeIcon(): Promise<void> {
		this.isLiked = !this.isLiked;

		this.numberLikes = this.isLiked ?
			++this.numberLikes : --this.numberLikes;

		const newEvent = {
			action: this.isLiked ? 'likes' : 'dislikes',
			thing: this.productId
		};

		try {
			await this.eventService.saveEvent(newEvent);
		} catch (error) {
			throw Error('Erro ao salvar evento!');
		}
	}

	public async handleClick(productId: string): Promise<void> {
		this.clickedDelete.emit(productId);
	}
}
