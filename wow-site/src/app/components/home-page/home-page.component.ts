import {Component} from '@angular/core';
import {DataService} from "../../services/data.service";
import {News} from "../../entities/news";
import {Event} from "../../entities/event";
declare let UIkit: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  news: News[] = [];
  events: Event[] = [];
  currentEvent: Event;
  currentNews: News;

  constructor(private _data: DataService) {
    _data.getNews().subscribe(
      (news: News[]) => this.news = news,
      error => console.error(error)
    );
    _data.getEvents().subscribe(
      (events: Event[]) => {
        this.events = events;
        this.currentEvent = this.events[0];
      },
      error => console.error(error)
    );
  }

  first250Chars(text: string) {
    return text.length > 250 ? text.substring(0, 250) + '...' : text;
  }

  openDetails(event: Event) {
    this.currentEvent = event;
    UIkit.modal('#eventDetailModal').show();
  }

  openNewsDetails(news: News) {
    this.currentNews = news;
    UIkit.modal('#newsDetailModal').show();
  }
}
