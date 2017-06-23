import { ConsultingListComponent } from './components/consulting/consulting-list/consulting-list.component';
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from
  "./components/home-page/home-page.component";
import {NewsListComponent} from
  "./components/news/news-list/news-list.component";
import {EventsListComponent} from
  "./components/events/events-list/events-list.component";
import {AboutComponent} from "./components/about/about.component";
import {TrainersListComponent} from "./components/trainers/trainers-list/trainers-list.component";
import {ContactsComponent} from "./components/contacts/contacts.component";


export const router: Routes = [
  {path: '', redirectTo: 'home-page', pathMatch: 'full'},
  {path: 'home-page', component: HomePageComponent},
  {path: 'news-page', component: NewsListComponent},
  {path: 'events-page', component: EventsListComponent},
  {path: 'trainers-page', component: TrainersListComponent},
  {path: 'consulting-page', component: ConsultingListComponent},
  {path: 'about-page', component: AboutComponent},
  {path: 'contact-page', component: ContactsComponent},
  {path: 'contact-page/:email', component: ContactsComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);