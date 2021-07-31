import { Component, Input, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

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
	@Input() latitude: number;
	@Input() longitude: number;
	@Input() productId: string;
	@Input() numberLikes: number;

	public classCss: string;
	public urlToMaps: string;
	public isLike: boolean = false;

	constructor(private eventService: EventService){}

	ngOnInit() {
		this.classCss = !this.showDistance ? 'not-distance' : 'show-distance';
		const codedNameMarket = this.marketName.replace(' ','+');

		this.urlToMaps = `https://www.google.com/maps/search/?api=1&query=${codedNameMarket}`;
	}

	public async changeIcon(): Promise<void> {
		this.isLike = !this.isLike;

		this.numberLikes = this.isLike ?
			++this.numberLikes : --this.numberLikes;

		const newEvent = {
			action: this.isLike ? 'likes' : 'dislikes',
			thing: this.productId
		};

		try {
			await this.eventService.saveEvent(newEvent);
		} catch (error) {
			console.log(error);
		}
	}
}
