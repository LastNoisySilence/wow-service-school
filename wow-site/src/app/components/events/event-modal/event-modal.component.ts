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
}
