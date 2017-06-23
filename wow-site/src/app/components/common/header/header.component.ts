import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  links = [
    {
      title: 'Главная',
      path: '/home-page'
    },
    {
      title: 'Новости',
      path: '/news-page'
    },
    {
      title: 'Тренинги',
      path: '/events-page'
    },
    {
      title: 'Тренеры',
      path: '/trainers-page'
    },
    {
      title: 'Консалтинг',
      path: '/consulting-page'
    },
    {
      title: 'Контакты',
      path: '/contact-page'
    },
    {
      title: 'О нас',
      path: '/about-page'
    }
  ];
  selectedLinkIndex: number = 0;

  constructor(private _router:Router) {
    _router.events.subscribe((e: any) => {
      this.selectedLinkIndex = this.links.indexOf(this.links.filter(link => {
        return e.url.indexOf(link.path) > -1;
      })[0]);
      this.selectedLinkIndex = this.selectedLinkIndex < 0
        ? 0
        : this.selectedLinkIndex;
    });
  }
}
