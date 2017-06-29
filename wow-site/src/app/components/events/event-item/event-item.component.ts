import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Event } from "../../../entities/event";
import { WindowRef } from "app/services/window.service";

declare const UIkit: any;

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent {

  @Input() event: Event;
  @Input() currentEvent: Event;
  @Output() onCurrentEventChange: EventEmitter<Event> = new EventEmitter();

  constructor(private _window: WindowRef) { }

  openEventDetails(event: Event) {
    this.currentEvent = event;
    this.onCurrentEventChange.emit(event);
    UIkit.modal('#eventDetailModal').show();
  }

  openSubscriptionModal(event: Event) {
    this.currentEvent = event;
    this.onCurrentEventChange.emit(event);
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
