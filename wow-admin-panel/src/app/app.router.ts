import { AuthGuardService } from './services/auth-guard.service';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsListComponent } from './components/news/news-list/news-list.component';
import { EventListComponent } from './components/events/event-list/event-list.component';
import { TrainerListComponent } from './components/trainers/trainer-list/trainer-list.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ConsultingListComponent } from './components/consultings/consulting-list/consulting-list.component';
import { LoginComponent } from './components/login/login.component';


export const router: Routes = [
  { path: '', redirectTo: '/admin-panel/news-page', pathMatch: 'full' },
  {
    path: 'login-page',
    component: LoginComponent
  },
  {
    path: 'admin-panel',
    canActivate: [AuthGuardService],
    component: AdminPanelComponent,
    children: [
      { path: 'news-page', component: NewsListComponent },
      { path: 'events-page', component: EventListComponent },
      { path: 'consulting-page', component: ConsultingListComponent },
      { path: 'trainers-page', component: TrainerListComponent },
    ]
  }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);