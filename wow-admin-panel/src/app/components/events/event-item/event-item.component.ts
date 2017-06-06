import {Component, Input} from '@angular/core';
import {EventService} from "../../../services/event.service";
import {DataService} from "../../../services/data.service";
import {Event} from "../../../entities/event";

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})

export class EventItemComponent {

  @Input() event: Event;

  constructor(private _data: DataService, private _event: EventService) {
  }

  deleteEvent() {
    this._data.deleteEvent(this.event).subscribe(
      () => this._event.deleteEvent(this.event),
      error => console.error('Event delete error', error)
    );
  }

  editEvent() {
    this._event.editEvent(this.event);
  }
}
