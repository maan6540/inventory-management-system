import { Component, inject, OnInit, signal } from '@angular/core';
import { NgxSonnerToaster } from 'ngx-sonner';
import { RouterOutlet } from '@angular/router';
import { Auth } from './core/services/auth';
import { Modal } from './shared/components/modal/modal';
import { Loader } from './shared/components/loader/loader';

@Component({
  imports: [NgxSonnerToaster, RouterOutlet, Modal, Loader],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly title = signal('InventoryManagmentSystem');
  private auth = inject(Auth);

  ngOnInit(): void {
    this.auth.restoreSession();
  }
}
