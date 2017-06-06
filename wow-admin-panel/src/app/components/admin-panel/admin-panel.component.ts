import {Component} from '@angular/core';
import {Router} from "@angular/router";

declare let UIkit: any;

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})

export class AdminPanelComponent {
  tabs: any = [
    {title: "Новости", path: "/news-page"},
    {title: "Тренера", path: "/trainers-page"},
    {title: "Мероприятия", path: "/events-page"}
  ];
  selectedTab: any = {};

  constructor(_router: Router) {
    _router.events.subscribe((e: any) => {
      this.selectedTab = this.tabs.filter(tab => {
        return tab.path === e.url;
      })[0] || this.tabs[0];
    });
  }

  openModalWindow() {
    UIkit.modal('#AddModal').show();
  }
}
