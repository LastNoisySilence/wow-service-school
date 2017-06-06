import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Event} from "../../../entities/event";

declare let UIkit: any;

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent {

  @Input() event: Event;
  @Input() currentEvent: Event;
  @Output() onCurrentEventChange: EventEmitter<Event> = new EventEmitter();

  openEventDetails(event: Event) {
    this.currentEvent = event;
    this.onCurrentEventChange.emit(event);
    UIkit.modal('#eventDetailModal').show();
  }

}
