import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<any>();

  notification$ = this.notificationSubject.asObservable();

  sendNotification(notification: any): void {
    this.notificationSubject.next(notification);
  }
}
