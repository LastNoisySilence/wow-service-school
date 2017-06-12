import {Component} from '@angular/core';
import {DataService} from "../../../services/data.service";
import {News} from "../../../entities/news";

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent {

  newsList: News[] = [];
  newsInModal: News;

  constructor(private _data: DataService) {
    _data.getNews().subscribe((news: News[]) => {
      this.newsList = news;
      this.newsInModal = this.newsList[0];
    }, error => console.error(error));
  }

  changeNewsInModal(news: News) {
    this.newsInModal = news;
  }

}
