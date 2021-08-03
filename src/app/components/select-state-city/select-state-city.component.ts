import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import cityLocation from '../../utils/city-location.json';

@Component({
	selector: 'app-select-state-city',
	templateUrl: './select-state-city.component.html',
	styleUrls: ['./select-state-city.component.scss']
})
export class SelectStateCityComponent implements OnInit {
	@Output() setValues: EventEmitter<any> = new EventEmitter();

	public states: any = cityLocation.estados;
	public cities: Array<string> = [];

	public stateSelected: number;
	public citySelected: string;

	constructor(private userService: UserService){}

	ngOnInit(): void {
		const currentUser = this.userService.getCurrentUser();
		if(currentUser) {
			const indexSelected = this.states.findIndex(location => location.sigla === currentUser.stateCode);
			this.stateSelected = indexSelected;

			this.setCities();

			this.citySelected = currentUser.city;

			this.handleChange();
		};
	}

	public setCities(): void {
		this.cities = cityLocation.estados[this.stateSelected].cidades;
		this.citySelected = '';
	}

	public handleChange(): void {
		this.setValues.emit({
			city: this.citySelected.trim(),
			stateCode: cityLocation.estados[this.stateSelected].sigla
		});
	}
}
