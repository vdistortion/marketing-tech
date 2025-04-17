import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  imports: [ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent {
  private fb = inject(FormBuilder);

  protected form = this.fb.group({
    fields: this.fb.array([]),
  });

  protected get fields(): FormArray {
    return this.form.get('fields') as FormArray;
  }

  protected addField() {
    const control = this.fb.control('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    });
    this.fields.push(control);
  }

  protected removeField(index: number) {
    this.fields.removeAt(index);
  }

  protected isInvalid(index: number): boolean {
    const control = this.fields.at(index);
    return control.invalid && control.touched;
  }

  protected onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      // тачим все поля для отображения ошибок
      this.fields.controls.forEach((control) => control.markAsTouched());
    }
  }
}
