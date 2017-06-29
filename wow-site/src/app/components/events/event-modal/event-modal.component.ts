import { Component, Input, OnDestroy } from '@angular/core';
import {Event} from "../../../entities/event";

declare const $, UIkit: any;

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})

export class EventModalComponent implements OnDestroy {

  @Input() event: Event;

  ngOnDestroy() {
    $('#eventDetailModal').remove();
    $('#subscriptionModal').remove();
  }

  openSubscriptionModal() {
    UIkit.modal('#subscriptionModal').show();
  }

  isIE() {
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    const trident = ua.indexOf('Trident/');
    if (trident > 0) {
      const rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    const edge = ua.indexOf('Edge/');
    if (edge > 0) {
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
    return false;
  }
}
