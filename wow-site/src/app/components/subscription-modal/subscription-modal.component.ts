import { GoogleAnalyticsEventsService } from './../../services/google-analytics-events.service';
import { Location } from '@angular/common';
import { WindowRef } from './../../services/window.service';
import { Router } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
declare const $, UIkit: any;

@Component({
  selector: 'app-subscription-modal',
  templateUrl: './subscription-modal.component.html',
  styleUrls: ['./subscription-modal.component.css']
})
export class SubscriptionModalComponent implements OnDestroy, OnInit {

  ngOnInit(): void {
    $('#subscriptionModal').on('beforehide', () => {
      this.subscribeForm.reset()
    });
  }

  // tslint:disable-next-line:member-ordering
  @Input() entity: any;
  @Input() type: string;
  @ViewChild('Subscription') subscribeForm: NgForm;
  baseUrl: String = '';

  userInfo: any = {};

  constructor(private _data: DataService, private _window: WindowRef, private _ga: GoogleAnalyticsEventsService) {
    this.baseUrl = _window.nativeWindow.location.origin;
    this.initUserInfo();
  }

  onSubmit() {
    this._ga.emitEvent(
      this.type,
      (this.type === 'Мероприятие' ? 'Приняли участие в: ' : 'Заказали: ') + this.entity.title,
      'Модальное окно услуги',
      10
    );
    this.userInfo.path = `${this.baseUrl}/#/${this.type === 'Консалтинг'
      ? 'consulting-page'
      : 'events-page'}/${this.entity._id}`;
      this.userInfo.title = this.entity.title;
    this._data.postUserData(this.userInfo).subscribe(() => {
      UIkit.modal('#subscriptionModal').hide();
      UIkit.notification('Ваш запрос принят. Мы ответим вам в ближайшее время', { status: 'success' });
    }, console.error);
  }

  initUserInfo() {
    this.userInfo = {
      type: 'Подписка',
      name: '',
      email: '',
      phone: '',
      title: '',
      path: ''
    };
  }

  ngOnDestroy() {
    $('#subscriptionModal').remove();
  }
}
