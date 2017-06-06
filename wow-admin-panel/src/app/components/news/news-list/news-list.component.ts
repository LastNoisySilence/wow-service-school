import {Component} from '@angular/core';
import {DataService} from "../../../services/data.service";
import {EventService} from "../../../services/event.service";
import {News} from "../../../entities/news";

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent {

  newsList: News[] = [];

  constructor(private _data: DataService, private _event: EventService) {
    _data.getNews().subscribe((news: News[]) => this.newsList = news);
    _event.onNewsAdd.subscribe((news: News) => {
      this.newsList.push(news);
    });
    _event.onNewsDelete.subscribe((news: News) => {
      this.newsList.splice(this.newsList.indexOf(news), 1);
    });
  }

}
