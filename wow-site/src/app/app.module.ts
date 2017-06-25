import { WindowRef } from './services/window.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { AppComponent } from './app.component';
import { DataService } from "./services/data.service";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { HeaderComponent } from "./components/common/header/header.component";
import { FooterComponent } from "./components/common/footer/footer.component";
import { routes } from "./app.router";
import {
  SafeHtmlPipe,
  NewsModalComponent
} from "./components/news/news-modal/news-modal.component";
import { EventModalComponent } from "./components/events/event-modal/event-modal.component";
import {
  NewsListComponent
} from './components/news/news-list/news-list.component';
import { NewsItemComponent } from './components/news/news-item/news-item.component';
import { EventsListComponent } from './components/events/events-list/events-list.component';
import { EventItemComponent } from './components/events/event-item/event-item.component';
import { AboutComponent } from './components/about/about.component';
import { TrainersListComponent } from './components/trainers/trainers-list/trainers-list.component';
import { TrainerItemComponent } from './components/trainers/trainer-item/trainer-item.component';
import { TrainerModalComponent } from './components/trainers/trainer-modal/trainer-modal.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ConsultingListComponent } from './components/consulting/consulting-list/consulting-list.component';
import { ConsultingItemComponent } from './components/consulting/consulting-item/consulting-item.component';
import { ConsultingModalComponent } from './components/consulting/consulting-modal/consulting-modal.component';
import { SubscriptionModalComponent } from './components/subscription-modal/subscription-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    EventModalComponent,
    NewsModalComponent,
    SafeHtmlPipe,
    NewsListComponent,
    NewsItemComponent,
    EventsListComponent,
    EventItemComponent,
    AboutComponent,
    TrainersListComponent,
    TrainerItemComponent,
    TrainerModalComponent,
    ContactsComponent,
    ConsultingListComponent,
    ConsultingItemComponent,
    ConsultingModalComponent,
    SubscriptionModalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    ReactiveFormsModule
  ],
  providers: [
    DataService,
    WindowRef,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    { provide: LOCALE_ID, useValue: "ru-RU" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
