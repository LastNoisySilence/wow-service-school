import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from
  "./components/home-page/home-page.component";
import {NewsListComponent} from
  "./components/news/news-list/news-list.component";
import {EventsListComponent} from
  "./components/events/events-list/events-list.component";
import {AboutComponent} from "./components/about/about.component";


export const router: Routes = [
  {path: '', redirectTo: 'home-page', pathMatch: 'full'},
  {path: 'home-page', component: HomePageComponent},
  {path: 'news-page', component: NewsListComponent},
  {path: 'events-page', component: EventsListComponent},
  {path: 'about-page', component: AboutComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);