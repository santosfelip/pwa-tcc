import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormButton } from 'src/app/interfaces/button.interface';
import { FormField } from 'src/app/interfaces/form-field.interface';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

declare const google;
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls:['./form.component.scss']
})
export class FormComponent {
	@Input() formGroup: FormGroup;
	@Input() formFields: Array<FormField>;
	@Input() formButtons: Array<FormButton>;
	@Input() showSelectStateCity: boolean = false;

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private userService: UserService,
		private productService: ProductService
	){}

	public saveStateAndCity({ city, stateCode }): void {
		this.formGroup.setValue({
			...this.formGroup.value,
			city,
			stateCode
		});
	}

	// eslint-disable-next-line @angular-eslint/use-lifecycle-interface
	async ngAfterViewInit(): Promise<void> {
		const input = this.document.getElementById('autocomplete') as HTMLInputElement;
		if(input) {
			const options = {
				componentRestrictions: { country: 'br' },
				fields: ['name', 'address_components'],
				strictBounds: false,
				types: ['establishment'],
			};
			const autocomplete = new google.maps.places.Autocomplete(input, options);

			autocomplete.addListener('place_changed', () => {
				this.formGroup.setValue({
					...this.formGroup.value,
					marketName: autocomplete.getPlace().name,
					city: autocomplete.getPlace()?.address_components[3].long_name,
					stateCode: autocomplete.getPlace()?.address_components[4].short_name,
				});
			});
		}
	}
}
