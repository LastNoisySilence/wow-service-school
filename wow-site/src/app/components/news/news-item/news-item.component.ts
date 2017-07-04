import { GoogleAnalyticsEventsService } from './../../../services/google-analytics-events.service';
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {News} from '../../../entities/news';
declare const UIkit: any;

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent {

  constructor(private _ga: GoogleAnalyticsEventsService) {}

  @Input() newsItem: News;
  @Input() currentNews: News;
  @Output() onCurrentNewsChange: EventEmitter<News> = new EventEmitter();

  shortDescription(text: string) {
    return text.length > 250 ? text.substring(0, 250) + '...' : text;
  }

  openNewsDetails(news: News) {
    this._ga.emitEvent('Новости', 'Открыто: ' + news.title, 'Модальное окно новости', 10);
    this.currentNews = news;
    this.onCurrentNewsChange.emit(news);
    UIkit.modal('#newsDetailModal').show();
  }
}
