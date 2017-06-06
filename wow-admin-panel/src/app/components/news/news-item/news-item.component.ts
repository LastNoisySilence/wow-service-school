import { Component, Input } from '@angular/core';
import {News} from "../../../entities/news";
import {EventService} from "../../../services/event.service";
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent {
  @Input() news: News;

  constructor(private _data: DataService, private _event: EventService){}

  deleteNews() {
    this._data.deleteNews(this.news).subscribe(() =>
      this._event.deleteNews(this.news),
      error => console.error('News delete error', error)
    );
  }

  editNews() {
    this._event.editNews(this.news);
  }
}
