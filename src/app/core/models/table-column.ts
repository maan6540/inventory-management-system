export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'badge' | 'status';
  class?: string;
}