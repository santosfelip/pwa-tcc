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
	public teste;

	constructor(
		@Inject(DOCUMENT) private document: Document){}

	// eslint-disable-next-line @angular-eslint/use-lifecycle-interface
	async ngAfterViewInit(): Promise<void> {
		const input = this.document.getElementById('autocomplete') as HTMLInputElement;
		if(input) {
			const options = {
				componentRestrictions: { country: 'br' },
				fields: ['name'],
				strictBounds: false,
				types: ['establishment'],
			};
			const autocomplete = new google.maps.places.Autocomplete(input, options);

			autocomplete.addListener('place_changed', () => {
				this.formGroup.setValue({
					...this.formGroup.value,
					marketName: autocomplete.getPlace().name
				});
			});
		}
	}
}
