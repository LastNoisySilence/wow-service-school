import { GoogleAnalyticsEventsService } from './../../services/google-analytics-events.service';
import {
  Component, OnDestroy, ElementRef,
  ViewChild, AfterViewInit
} from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
declare const UIkit: any;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements AfterViewInit, OnDestroy {

  userInfo: any = {
    type: 'Контакты',
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  private sub: any;
  @ViewChild('name') nameInput: ElementRef;
  isHideMessageInput: Boolean = false;
  subscribeTitle: String = 'Напишите нам';
  isSent: Boolean = false;
  constructor(private _data: DataService, private route: ActivatedRoute, private _ga: GoogleAnalyticsEventsService) {}


  ngAfterViewInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params.email) {
        this.userInfo.type = 'Подписка';
        this.userInfo.email = params.email;
        this.subscribeTitle = 'Подпишитесь на нас';
        this.isHideMessageInput = true;
        this.nameInput.nativeElement.focus();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    this._ga.emitEvent(this.userInfo.type, 'Отправлена форма', 'Модальное окно мероприятия', 10);
    this._data.postUserData(this.userInfo).subscribe(() => {
      this.isSent = true;
      UIkit.notification(this.userInfo.type === 'Подписка'
      ? 'Спасибо! Теперь вы подписаны на рассылку'
      : 'Спасибо! Мы ответим вам в ближайшее время', { status: 'success' });
    }, console.error);
  }

}
