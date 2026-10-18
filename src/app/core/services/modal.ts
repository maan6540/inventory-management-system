import { ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private onSuccess?: (message: string) => void;
  private modal: any;
  private modalBody?: ViewContainerRef;
  private modalComponent?: any;
  private activeComponent?: ComponentRef<any>;

  registerModal(modalComponent: any) {
    this.modalComponent = modalComponent;
  }

  registerModalBody(viewContainerRef: ViewContainerRef) {
    this.modalBody = viewContainerRef;
  }

  open(
    component: Type<unknown>,
    title?: string,
    onSuccess?: (message: string) => void,
    data?: Record<string, any>,
  ) {
    this.onSuccess = onSuccess;

    if (!this.modalBody || !this.modalComponent) {
      console.error('Modal is not registered.');
      return;
    }

    this.modalComponent.modalTitle = title ?? 'Title';
    this.modalComponent.refresh();

    this.modalBody.clear();
    this.activeComponent = this.modalBody.createComponent(component);
    if (data) {
      Object.assign(this.activeComponent.instance, data);
    }

    const modalElement = document.getElementById('staticBackdrop');

    if (modalElement) {
      this.modal = new (window as any).bootstrap.Modal(modalElement);
      this.modal.show();
    }
  }

  close() {
    if (this.modal) {
      this.modal.hide();
    }

    this.modalBody?.clear();
  }

  complete(message: string): void {
    this.onSuccess?.(message);
  }
}
