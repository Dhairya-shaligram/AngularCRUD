import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-common-validation',
  templateUrl: './common-validation.component.html',
  styleUrls: ['./common-validation.component.scss']
})
export class CommonValidationComponent {
  @Input() controlName!: string;
  @Input() formGroup!: FormGroup;
  @Input() formSubmitted: boolean = false;

  isFieldInvalid(): boolean {
    const control = this.formGroup.get(this.controlName);
    return control ? control.invalid : false;
  }
}
