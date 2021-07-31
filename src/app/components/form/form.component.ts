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
	public teste;

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private userService: UserService,
		private productService: ProductService
	){}

	// eslint-disable-next-line @angular-eslint/use-lifecycle-interface
	async ngAfterViewInit(): Promise<void> {
		const input = this.document.getElementById('autocomplete') as HTMLInputElement;
		if(input) {
			// Centraliza a localização em um raio de 10km
			const center = {
				latitude: this.userService.getCurrentUser().latitude,
				longitude: this.userService.getCurrentUser().longitude
			};
			const defaultBounds = {
				north: center.latitude + 0.1,
				south: center.latitude - 0.1,
				east: center.longitude + 0.1,
				west: center.longitude - 0.1,
			};

			const options = {
				bounds: defaultBounds,
				componentRestrictions: { country: 'br' },
				fields: ['name', 'geometry'],
				strictBounds: false,
				types: ['establishment'],
			};
			const autocomplete = new google.maps.places.Autocomplete(input, options);

			autocomplete.addListener('place_changed', () => {
				this.formGroup.setValue({
					...this.formGroup.value,
					marketName: autocomplete.getPlace().name
				});

				const productLocation = {
					latitude: autocomplete.getPlace()?.geometry?.location?.lat(),
					longitude: autocomplete.getPlace()?.geometry?.location?.lng(),
				};

				// Salva a localização do Mercado
				this.productService.currentLocation = productLocation;
			});
		}
	}
}
