import {Injectable, EventEmitter} from '@angular/core';
import {News} from "../entities/news";
import {Trainer} from "../entities/trainer";
import {Event} from "../entities/event";
import {EventsCategory} from "../entities/eventsCategory";

@Injectable()
export class EventService {

  onNewsAdd: EventEmitter<News> = new EventEmitter();
  onNewsDelete: EventEmitter<News> = new EventEmitter();
  onNewsEdit: EventEmitter<News> = new EventEmitter();

  onTrainerAdd: EventEmitter<Trainer> = new EventEmitter();
  onTrainerDelete: EventEmitter<Trainer> = new EventEmitter();
  onTrainerEdit: EventEmitter<Trainer> = new EventEmitter();

  onEventAdd: EventEmitter<Event> = new EventEmitter();
  onEventDelete: EventEmitter<Event> = new EventEmitter();
  onEventEdit: EventEmitter<Event> = new EventEmitter();

  onCategoryAdd: EventEmitter<EventsCategory> = new EventEmitter();
  onCategoryDelete: EventEmitter<EventsCategory> = new EventEmitter();
  onCategoryEdit: EventEmitter<EventsCategory> = new EventEmitter();

  addNews(news: News) {
    this.onNewsAdd.emit(news);
  }
  deleteNews(news: News) {
    this.onNewsDelete.emit(news);
  }
  editNews(news: News) {
    this.onNewsEdit.emit(news);
  }

  addTrainer(trainer: Trainer) {
    this.onTrainerAdd.emit(trainer);
  }
  deleteTrainer(trainer: Trainer) {
    this.onTrainerDelete.emit(trainer);
  }
  editTrainer(trainer: Trainer) {
    this.onTrainerEdit.emit(trainer);
  }

  addEvent(event: Event) {
    this.onEventAdd.emit(event);
  }
  deleteEvent(event: Event) {
    this.onEventDelete.emit(event);
  }
  editEvent(event: Event) {
    this.onEventEdit.emit(event);
  }

  addCategory(category: EventsCategory) {
    this.onCategoryAdd.emit(category);
  }
  deleteCategory(category: EventsCategory) {
    this.onCategoryDelete.emit(category);
  }
  editCategory(category: EventsCategory) {
    this.onCategoryEdit.emit(category);
  }
}
