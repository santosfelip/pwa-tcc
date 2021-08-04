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
	@Input() productId: string;
	@Input() numberLikes: number;
	@Input() isLiked: boolean;

	public classCss: string;
	public urlToMaps: string;

	constructor(private eventService: EventService){}

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
			console.log(error);
		}
	}
}
