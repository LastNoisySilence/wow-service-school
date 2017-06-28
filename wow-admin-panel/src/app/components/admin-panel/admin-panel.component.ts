import { DataService } from './../../services/data.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

declare const UIkit: any;

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})

export class AdminPanelComponent {
  tabs: any = [
    { title: 'Новости', path: '/admin-panel/news-page' },
    { title: 'Тренеры', path: '/admin-panel/trainers-page' },
    { title: 'Мероприятия', path: '/admin-panel/events-page' },
    { title: 'Консалтинги', path: '/admin-panel/consulting-page' },
  ];
  selectedTab: any = {};

  constructor(private _data: DataService, private _router: Router) {
    _router.events.subscribe((e: any) => {
      this.selectedTab = this.tabs.filter(tab => {
        return tab.path === e.url;
      })[0] || this.tabs[0];
    });
  }

  logout() {
    this._data.logout().subscribe(() => this._router.navigate(['/login-page']));
  }

  openModalWindow() {
    UIkit.modal('#AddModal').show();
  }
}
