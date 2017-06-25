import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { EventsCategory } from "../../../entities/eventsCategory";
import { Event } from "../../../entities/event";
import { DataService } from "../../../services/data.service";
declare const $, UIkit: any;

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnDestroy {
  ngOnDestroy(): void {
    $('#subscriptionModal').remove();
    $('#eventDetailModal').remove();
  }

  // tslint:disable-next-line:member-ordering
  eventsList: Event[] = [];
  eventsCategoryList: EventsCategory[] = [];
  eventInModal: Event;

  constructor(private _data: DataService, private _route: ActivatedRoute) {
    _data.getEvents().subscribe((events: Event[]) => {
      this.eventsList = events;
      this._route.params.subscribe(param => {
        if (param.id) {
          this.eventInModal = this.eventsList.filter((event: Event) => {
            return event._id === param.id;
          })[0];
          UIkit.modal('#eventDetailModal').show();
        }
      });
    }, console.error);
    _data.getEventsCategory().subscribe((categories: EventsCategory[]) => {
      this.eventsCategoryList = categories;
    }, console.error);
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
