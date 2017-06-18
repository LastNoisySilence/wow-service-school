import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {FroalaEditorModule, FroalaViewModule} from 'angular2-froala-wysiwyg';
import {routes} from "./app.router";
import {AppComponent} from './app.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {DataService} from "./services/data.service";
import {EventService} from "./services/event.service";
import {NewNewsModalComponent} from './components/news/new-news-modal/new-news-modal.component';
import {NewsListComponent} from './components/news/news-list/news-list.component';
import {NewsItemComponent} from './components/news/news-item/news-item.component';
import {NewTrainerModalComponent} from './components/trainers/new-trainer-modal/new-trainer-modal.component';
import {TrainerListComponent} from './components/trainers/trainer-list/trainer-list.component';
import {TrainerItemComponent} from './components/trainers/trainer-item/trainer-item.component';
import {NewEventModalComponent} from './components/events/new-event-modal/new-event-modal.component';
import {EventItemComponent} from './components/events/event-item/event-item.component';
import {EventListComponent} from './components/events/event-list/event-list.component';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';
import { ConsultingListComponent } from './components/consultings/consulting-list/consulting-list.component';
import { ConsultingItemComponent } from './components/consultings/consulting-item/consulting-item.component';
import { ConsultingModalComponent } from './components/consultings/consulting-modal/consulting-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NewNewsModalComponent,
    NewsListComponent,
    NewsItemComponent,
    NewTrainerModalComponent,
    TrainerListComponent,
    TrainerItemComponent,
    NewEventModalComponent,
    EventItemComponent,
    EventListComponent,
    AdminPanelComponent,
    ConsultingListComponent,
    ConsultingItemComponent,
    ConsultingModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [
    DataService,
    EventService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {provide: LOCALE_ID, useValue: "ru-RU"}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
