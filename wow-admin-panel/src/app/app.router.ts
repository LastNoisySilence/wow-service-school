import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewsListComponent} from "./components/news/news-list/news-list.component";
import {EventListComponent} from "./components/events/event-list/event-list.component";
import {TrainerListComponent} from "./components/trainers/trainer-list/trainer-list.component";
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";


export const router: Routes = [
  {path: '', redirectTo: 'news-page', pathMatch: 'full'},
  {path: 'news-page', component: NewsListComponent},
  {path: 'events-page', component: EventListComponent},
  {path: 'trainers-page', component: TrainerListComponent},
  {path: 'admin-panel', component: AdminPanelComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);