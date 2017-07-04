import { GoogleAnalyticsEventsService } from './../../../services/google-analytics-events.service';
import { Consulting } from './../../../entities/consulting';
import { DataService } from './../../../services/data.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as console from 'console';
declare const UIkit: any;

@Component({
  selector: 'app-consulting-item',
  templateUrl: './consulting-item.component.html',
  styleUrls: ['./consulting-item.component.css']
})
export class ConsultingItemComponent {

  @Input() consulting: Consulting;
  @Input() currentConsulting: Consulting;
  @Output() onCurrentConsultingChange: EventEmitter<Consulting> = new EventEmitter();

  constructor(private _ga: GoogleAnalyticsEventsService) {}

  openConsultingtDetails(consulting: Consulting) {
    this._ga.emitEvent('Консалтинг', 'Открыто: ' + consulting.title, 'Модальное окно консалтинга', 10);
    this.currentConsulting = consulting;
    this.onCurrentConsultingChange.emit(consulting);
    UIkit.modal('#consultingDetailModal').show();
  }

  openSubscriptionModal(consulting: Consulting) {
    this.currentConsulting = consulting;
    this.onCurrentConsultingChange.emit(consulting);
    UIkit.modal('#subscriptionModal').show();
  }

  shortDescription(text: string) {
    return text.length > 250 ? text.substring(0, 250) + '...' : text;
  }
}
