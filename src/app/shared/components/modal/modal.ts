import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from '../../../core/services/modal';

@Component({
  imports: [],
  selector: 'app-modal',
  styleUrl: './modal.scss',
  templateUrl: './modal.html',
})
export class Modal {
  private modalService = inject(ModalService);
  private changeDetector = inject(ChangeDetectorRef);
  @Input() modalTitle = 'title';
  @Input() confirmButtonText = 'Confirm';

  @ViewChild('modalBody', { read: ViewContainerRef })
  modalBody!: ViewContainerRef;
  ngAfterViewInit() {
    this.modalService.registerModal(this);
    this.modalService.registerModalBody(this.modalBody);
  }

  refresh() {
    this.changeDetector.detectChanges();
  }
}
