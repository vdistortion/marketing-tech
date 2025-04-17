import { Component } from '@angular/core';
import { ParallelChainsComponent } from './parallel-chains/parallel-chains.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-root',
  imports: [ParallelChainsComponent, DynamicFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
