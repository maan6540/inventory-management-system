import { Component, signal } from '@angular/core';
import { NgxSonnerToaster } from 'ngx-sonner';
import { User } from './features/user/user';
import { MainLayout } from './layout/main-layout/main-layout';
@Component({
  imports: [ MainLayout, NgxSonnerToaster],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('InventoryManagmentSystem');
}
