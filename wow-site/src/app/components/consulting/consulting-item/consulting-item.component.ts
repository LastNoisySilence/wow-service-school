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

  openConsultingtDetails(consulting: Consulting) {
    this.currentConsulting = consulting;
    this.onCurrentConsultingChange.emit(consulting);
    UIkit.modal('#consultingDetailModal').show();
  }

  shortDescription(text: string) {
    return text.length > 250 ? text.substring(0, 250) + '...' : text;
  }
}
