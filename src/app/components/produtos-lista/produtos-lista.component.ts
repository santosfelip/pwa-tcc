import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from 'src/app/services/product.service';

@Component({
  selector: 'app-produtos-lista',
  templateUrl: './produtos-lista.component.html',
  styleUrls: ['./produtos-lista.component.scss'],
})
export class ProdutosListaComponent {

	@Input() productsList: Array<IProduct>;
	@Input() isDelete: boolean = false;

	@Output() clickedDelete: EventEmitter<string> = new EventEmitter();

	public handleClick(productId: string) {
		this.clickedDelete.emit(productId);
	}
}
