import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { FeedBackService } from 'src/app/services/feedback.service';

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
	@Input() isFeedBack: boolean;
	@Input() creat_at: any;

	@Output() clickedDelete: EventEmitter<string> = new EventEmitter();

	public classCss: string;
	public urlToMaps: string;
	public publishedIn: string;

	constructor(
		private eventService: EventService,
		private feedBackService: FeedBackService,
		private router: Router
	){}

	ngOnInit() {
		this.classCss = !this.showDistance ? 'not-distance' : 'show-distance';
		const codedNameMarket = this.marketName.replace(' ','+');

		this.urlToMaps = `https://www.google.com/maps/search/?api=1&query=${codedNameMarket}`;

		this.setPublishedIn();
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

	public async handleFeedBack(): Promise<void> {
		try {
			this.isFeedBack = !this.isFeedBack;
			const action = this.isFeedBack ? 'add' : 'remove';

			await this.feedBackService.saveFeedBack(this.productId, action);
		} catch (error) {
			throw Error(error);
		}
	}

	public navigateProductDetail(): void {
		this.router.navigate([`/product-details/${this.productId}`], { replaceUrl: true });
	}

	private setPublishedIn(): void {
		// eslint-disable-next-line no-underscore-dangle
		const creatAt = new Date(this.creat_at._seconds * 1000);
		this.publishedIn = creatAt.toLocaleDateString('pt-BR');
	}
}
