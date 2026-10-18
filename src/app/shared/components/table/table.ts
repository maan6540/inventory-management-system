import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { UpperCasePipe, NgClass, DatePipe } from '@angular/common';
@Component({
  imports: [UpperCasePipe, NgClass, DatePipe],
  selector: 'app-table',
  styleUrl: './table.scss',
  templateUrl: './table.html',
})
export class Table {
  @Input() data: any[] = [];
  @Input() currentPage = 1;
  @Input() totalPages = 0;
  @Input() pageSize = 10;
  @Input() totalItems = 0;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  onPageSizeChange(event: Event) {
    const pageSize = Number((event.target as HTMLSelectElement).value);
    this.pageSizeChange.emit(pageSize);
  }
  totalPagesArray: number[] = [];

  tableHeaders: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data.length > 0) {
      this.tableHeaders = Object.keys(this.data[0]).filter(
        (key) => !key.toLowerCase().endsWith('id'),
      );
    }
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  onEdit(row: any) {
    this.edit.emit(row);
  }

  onDelete(row: any) {
    this.delete.emit(row);
  }

  get startRecord(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endRecord(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  get visiblePages(): (number | string)[] {
    if (this.totalPages <= 5) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    if (this.currentPage <= 3) {
      return [1, 2, 3, '...', this.totalPages];
    }

    if (this.currentPage >= this.totalPages - 2) {
      return [1, '...', this.totalPages - 2, this.totalPages - 1, this.totalPages];
    }

    return [1, '...', this.currentPage, '...', this.totalPages];
  }
  getStatusClass(status: string): string {
    switch (status) {
      case 'Active':
        return 'bg-success';

      case 'Inactive':
        return 'bg-danger';

      case 'Pending':
        return 'bg-warning text-dark';

      case 'Suspended':
        return 'bg-secondary';

      default:
        return 'bg-light text-dark';
    }
  }
}
