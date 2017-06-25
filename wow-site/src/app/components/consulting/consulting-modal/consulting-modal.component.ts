import { Consulting } from './../../../entities/consulting';
import { Component, OnDestroy, Input } from '@angular/core';
declare const $, UIkit: any;

@Component({
  selector: 'app-consulting-modal',
  templateUrl: './consulting-modal.component.html',
  styleUrls: ['./consulting-modal.component.css']
})
export class ConsultingModalComponent implements OnDestroy {

  @Input() consulting: Consulting;

  ngOnDestroy() {
    $('#consultingDetailModal').remove();
    $('#subscriptionModal').remove();
  }

  openSubscriptionModal() {
    UIkit.modal('#subscriptionModal').show();
  }

}
