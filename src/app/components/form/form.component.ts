import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormButton } from 'src/app/interfaces/button.interface';
import { FormField } from 'src/app/interfaces/form-field.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls:['./form.component.scss']
})
export class FormComponent {
	@Input() formGroup: FormGroup;
	@Input() formFields: Array<FormField>;
	@Input() formButtons: Array<FormButton>;

	constructor(){
	}
}
