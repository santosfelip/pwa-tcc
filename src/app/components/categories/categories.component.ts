import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls:['./categories.component.scss']
})
export class CategoriesComponent {
	@Input() categoriesList;
	@Output() clicked: EventEmitter<number> = new EventEmitter();

	public click(id: number): void {
		this.clicked.emit(id);
	}
}
