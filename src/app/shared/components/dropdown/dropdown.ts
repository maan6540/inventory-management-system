import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  imports: [],
  styleUrl: './dropdown.scss',
  templateUrl: './dropdown.html',
})
export class Dropdown {

  @Input() options: any[] = [];
  @Input() labelKey = '';
  @Input() valueKey = '';
  @Input() placeholder = 'Select';

  // Parent controls the selected value
  @Input() selectedValue: any = null;

  // Send selected option to parent
  @Output() valueChange = new EventEmitter<any>();


  // Get selected object
  get selectedOption(): any {

    return this.options.find(
      option => option[this.valueKey] === this.selectedValue
    );

  }


  // When user selects an option
  onOptionSelected(option: any) {
    this.selectedValue = option[this.valueKey];
    this.valueChange.emit(option);

  }

}