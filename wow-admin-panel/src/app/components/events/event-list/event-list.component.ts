import {Component} from '@angular/core';
import {Event} from "../../../entities/event";
import {DataService} from "../../../services/data.service";
import {EventService} from "../../../services/event.service";
import {EventsCategory} from "../../../entities/eventsCategory";
import {Trainer} from "../../../entities/trainer";

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
    _data.getEvents().subscribe((event: Event[]) => {
        this.eventsList = event
      },
      error => console.error(error));
    _data.getTrainers().subscribe((trainers: Trainer[]) => {
      this.trainersList = trainers;
    }, error => console.error(error));
    _data.getEventsCategory().subscribe((eventsCategory: EventsCategory[]) => {
      this.eventsCategoryList = eventsCategory;
    }, error => console.error(error));
    _event.onEventAdd.subscribe((event: Event) => {
      this.eventsList.push(event);
      _data.getEventsCategory().subscribe((eventsCategory: EventsCategory[]) => {
        this.eventsCategoryList = eventsCategory;
      }, error => console.error(error));
    });
    _event.onCategoryAdd.subscribe((category: EventsCategory) => {
      this.eventsCategoryList.push(category);
    });
    _event.onEventEdit.subscribe(() => {
      _data.getEventsCategory().subscribe((eventsCategory: EventsCategory[]) => {
        this.eventsCategoryList = eventsCategory;
      }, error => console.error(error));
    });
    _event.onEventDelete.subscribe((event: Event) => {
      this.eventsList.splice(this.eventsList.indexOf(event), 1);
      _data.getEventsCategory().subscribe((eventsCategory: EventsCategory[]) => {
        this.eventsCategoryList = eventsCategory;
      }, error => console.error(error));
    });
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

  renameCategory(category: EventsCategory) {
    this.isReadonlyTitle = true;
    this._data.editEventsCategory(category).subscribe(
      () => {
      },
      (error) => console.error(error)
    )
  }

  removeCategory(category: EventsCategory) {
    this._data.deleteEventsCategory(category).subscribe(
      () => {
        this.eventsCategoryList
          .splice(this.eventsCategoryList.indexOf(category), 1);
        this._data.getEventsCategory().subscribe(
          (eventsCategory: EventsCategory[]) => {
            this.eventsCategoryList = eventsCategory;
          }, error => console.error(error));
      },
      error => console.error(error))
  }
}
