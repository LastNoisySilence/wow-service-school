import {Component} from '@angular/core';
import {Event} from "../../../entities/event";
import {DataService} from "../../../services/data.service";
import {EventService} from "../../../services/event.service";
import {EventsCategory} from "../../../entities/eventsCategory";
import {Trainer} from "../../../entities/trainer";
import _ from 'lodash';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})

export class EventListComponent {

  eventsList: Event[] = [];
  trainersList: Trainer[] = [];
  eventsCategoryList: EventsCategory[] = [];
  isReadonlyTitle: boolean = true;

  constructor(private _data: DataService, private _event: EventService) {
    this.loadData();
    _data.getTrainers().subscribe((trainers: Trainer[]) => {
      this.trainersList = trainers;
    }, error => console.error(error));
    _event.onCategoryAdd.subscribe((category: EventsCategory) => {
      this.eventsCategoryList.push(category);
    });
    _event.onEventUpdate.subscribe(() => {
      this.loadData();
    });
    _event.onEventAdd.subscribe((event: Event) => {
      this.eventsList.push(event);
      this.eventsCategoryList.map((category: EventsCategory) => {
        if (category._id === event.categoryId)
          category.listOfEventsIds.push(event._id);
      });
      this.loadData();
    });
    _event.onEventDelete.subscribe((event: Event) => {
      this._data.deleteEvent(event).subscribe(() => {
        _.remove(this.eventsList, (c: Event) => {
          return c === event;
        });
        this.eventsCategoryList.map((category: EventsCategory) => {
          _.remove(category.listOfEventsIds, (id) => {
            return id === event._id;
          });
        });
      }, console.error);
    });
  }

  loadData() {
    this._data.getEvents().subscribe((events: Event[]) => {
      this.eventsList = events;
    }, console.error);
    this._data.getEventsCategory().subscribe((categories: EventsCategory[]) => {
      this.eventsCategoryList = categories;
    }, console.error);
  }

  getEventByCategory(category: EventsCategory) {
    return this.eventsList.filter(e => {
      return category.listOfEventsIds.filter(id => {
        return e._id === id;
      })[0];
    });
  }

  getFullCategories() {
    return this.eventsCategoryList.filter(category => {
      return category.listOfEventsIds.length > 0;
    });
  }

  renameCategory(category: EventsCategory) {
    this.isReadonlyTitle = true;
    this._data.editEventsCategory(category).subscribe(
      () => {}, console.error
    )
  }

  removeCategory(category: EventsCategory) {
    this._data.deleteEventsCategory(category).subscribe(
      () => this.loadData(), console.error)
  }
}
