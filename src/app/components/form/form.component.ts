import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormButton } from 'src/app/interfaces/button.interface';
import { FormField } from 'src/app/interfaces/form-field.interface';

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

	constructor(
		@Inject(DOCUMENT) private document: Document){}

	// eslint-disable-next-line @angular-eslint/use-lifecycle-interface
	async ngAfterViewInit(): Promise<void> {
		const input = this.document.getElementById('autocomplete') as HTMLInputElement;
		if(input) {
			const center = { lat: 20.5072637, lng: -54.6643489 };
			// Create a bounding box with sides ~10km away from the center point
			const defaultBounds = {
				north: center.lat + 0.1,
				south: center.lat - 0.1,
				east: center.lng + 0.1,
				west: center.lng - 0.1,
			};
			const options = {
				bounds: defaultBounds,
				componentRestrictions: { country: 'pt' },
				fields: ['name'],
				strictBounds: false,
				types: ['establishment'],
			};
			const autocomplete = new google.maps.places.Autocomplete(input, options);
		}
	}
}
