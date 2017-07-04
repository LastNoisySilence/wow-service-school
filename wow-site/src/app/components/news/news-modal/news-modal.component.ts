import {Component, Input, PipeTransform, Pipe, OnDestroy} from '@angular/core';
import {News} from "../../../entities/news";
import {DomSanitizer} from '@angular/platform-browser'
declare const $: any;

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.component.html',
  styleUrls: ['./news-modal.component.css']
})
export class NewsModalComponent implements OnDestroy {

  @Input() news: News;

  ngOnDestroy() {
    $('#newsDetailModal').remove();
  }

}

@Pipe({name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {
  }

  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

