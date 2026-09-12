import { Component, inject } from '@angular/core';
import { NotificationService } from '../../core/services/notification';

@Component({
  imports: [],
  selector: 'app-user',
  styleUrl: './user.scss',
  templateUrl: './user.html',
})
export class User {
  private notification = inject(NotificationService);
  deleteuser(){
    this.notification.success('User Deleted Successfully');
  }
}
