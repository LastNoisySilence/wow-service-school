import {Injectable, EventEmitter} from '@angular/core';
import {News} from "../entities/news";
import {Trainer} from "../entities/trainer";
import {Event} from "../entities/event";
import {EventsCategory} from "../entities/eventsCategory";
import {Consulting} from "../entities/consulting";
import {ConsultingCategory} from "../entities/consultingCategory";

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
  onEventUpdate: EventEmitter<Event> = new EventEmitter();

  onConsultingAdd: EventEmitter<Consulting> = new EventEmitter();
  onConsultingDelete: EventEmitter<Consulting> = new EventEmitter();
  onConsultingEdit: EventEmitter<Consulting> = new EventEmitter();
  onConsultingUpdate: EventEmitter<Consulting> = new EventEmitter();

  onCategoryAdd: EventEmitter<EventsCategory> = new EventEmitter();
  onCategoryDelete: EventEmitter<EventsCategory> = new EventEmitter();
  onCategoryEdit: EventEmitter<EventsCategory> = new EventEmitter();

  onConsultingCategoryAdd: EventEmitter<ConsultingCategory> =
    new EventEmitter();
  onConsultingCategoryDelete: EventEmitter<ConsultingCategory> =
    new EventEmitter();
  onConsultingCategoryEdit: EventEmitter<ConsultingCategory> =
    new EventEmitter();

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
  updateEvent(event: Event) {
    this.onEventUpdate.emit(event);
  }

  addConsulting(consulting: Consulting) {
    this.onConsultingAdd.emit(consulting);
  }
  deleteConsulting(consulting: Consulting) {
    this.onConsultingDelete.emit(consulting);
  }
  editConsulting(consulting: Consulting) {
    this.onConsultingEdit.emit(consulting);
  }
  updateConsulting(consulting: Consulting) {
    this.onConsultingUpdate.emit(consulting);
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

  addConsultingCategory(consultingCategory: ConsultingCategory) {
    this.onConsultingCategoryAdd.emit(consultingCategory);
  }
  deleteConsultingCategory(consultingCategory: ConsultingCategory) {
    this.onConsultingCategoryDelete.emit(consultingCategory);
  }
  editConsultingCategory(consultingCategory: ConsultingCategory) {
    this.onConsultingCategoryEdit.emit(consultingCategory);
  }
}
