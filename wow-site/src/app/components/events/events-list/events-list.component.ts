import {Component} from '@angular/core';
import {EventsCategory} from "../../../entities/eventsCategory";
import {Event} from "../../../entities/event";
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent {

  eventsList: Event[] = [];
  eventsCategoryList: EventsCategory[] = [];
  eventInModal: Event;

  constructor(private _data: DataService) {
    _data.getEvents().subscribe((events: Event[]) => {
      this.eventsList = events;
    }, console.error);
    _data.getEventsCategory().subscribe((categories: EventsCategory[]) => {
      this.eventsCategoryList = categories;
    }, console.error)
  }

  getEventByCategory(category: EventsCategory) {
    let eventsByCategory: Event[] = [];
    this.eventsList.map(event => {
      category.listOfEventsIds.map(id => {
        if (event._id === id) {
          eventsByCategory.push(event);
        }
      });
    });
    return eventsByCategory;
  }

  getFullCategories() {
    return this.eventsCategoryList.filter(category => {
      return category.listOfEventsIds.length > 0;
    });
  }

  changeEventInModal(event: Event) {
    this.eventInModal = event;
  }
}
