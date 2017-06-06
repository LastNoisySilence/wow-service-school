import {Component, OnDestroy, OnInit} from '@angular/core';
import {News} from "../../../entities/news";
import {DataService} from "../../../services/data.service";
import {EventService} from "../../../services/event.service";

declare let UIkit, $: any;

@Component({
  selector: 'app-new-news-modal',
  templateUrl: './new-news-modal.component.html',
  styleUrls: ['./new-news-modal.component.css']
})
export class NewNewsModalComponent implements OnDestroy, OnInit {
  ngOnInit(): void {
    $('#AddModal').on('beforehide', () => {
      this.clearData();
    });
  }
  ngOnDestroy(): void {
    $('#AddModal').remove();
  }

  news: News = new News();
  isEditMode: boolean = false;
  defaultImageSrc: string = '/static/emptyImage.png';

  constructor(private _data: DataService, private _event: EventService) {
    _event.onNewsEdit.subscribe((news: News) => {
      this.news = news;
      this.defaultImageSrc = news.imagePath.length > 0
        ? news.imagePath
        : '/static/emptyImage.png';
      UIkit.modal('#AddModal').show();
      this.isEditMode = true;
    });
  }

  toolbarButtons = [
    'bold', 'italic', 'underline',
    'fontSize', 'insertHR', 'color',
    '|', 'paragraphFormat', 'align',
    'formatOL', 'formatUL', 'undo',
    'redo', 'clearFormatting'
  ];

  public options: Object = {
    zIndex: 2501,
    language: 'ru',
    placeholderText: 'Описание новости...',
    toolbarInline: false,
    charCounterCount: false,
    quickInsertButtons: ['ul', 'ol', 'hr'],
    toolbarButtons: this.toolbarButtons,
    toolbarButtonsMD: this.toolbarButtons,
    toolbarButtonsXS: this.toolbarButtons,
    toolbarButtonsSM: this.toolbarButtons
  };

  uploadImage(image: any) {
    let bar = $("#progressbar")[0];

    UIkit.upload('.image-upload', {
      url: '/upload',
      multiple: true,
      error: function () {
        console.error('error', arguments);
      },
      complete: (resp) => {
        this.news.imagePath = this.defaultImageSrc = '/images/' + resp.responseJSON[0].filename;
        setTimeout(function () {
          bar.setAttribute('hidden', 'hidden');
        }, 1000);
      },
      loadStart: function (e) {
        bar.removeAttribute('hidden');
        bar.max = e.total;
        bar.value = e.loaded;
      },
      progress: function (e) {
        bar.max = e.total;
        bar.value = e.loaded;
      },
      loadEnd: function (e) {
        bar.max = e.total;
        bar.value = e.loaded;
      }
    });
  }

  add() {
    this._data.addNews(this.news).subscribe(
      response => {
        this.news._id = response.json()._id;
        this._event.addNews(this.news);
        UIkit.modal('#AddModal').hide();
        this.clearData();
      },
      error => {
        console.error(error);
      }
    );
  }

  update() {
    this._data.editNews(this.news).subscribe(
      resp => {
        console.info(resp);
        UIkit.modal('#AddModal').hide();
        this.clearData();
      },
      error => {
        console.error(error)
      }
    );
  }

  clearData() {
    this.news = new News();
    this.defaultImageSrc = '/static/emptyImage.png';
    this.isEditMode = false;
  }
}
