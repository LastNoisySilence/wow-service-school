import {Component, Input} from '@angular/core';
import {Consulting} from "../../../entities/consulting";
import {EventService} from "../../../services/event.service";

@Component({
  selector: 'app-consulting-item',
  templateUrl: './consulting-item.component.html',
  styleUrls: ['./consulting-item.component.css']
})
export class ConsultingItemComponent {

  @Input() consulting: Consulting;

  constructor(private _event: EventService) {

  }

  editConsulting() {
    this._event.editConsulting(this.consulting);
  }

  deleteConsulting() {
    this._event.deleteConsulting(this.consulting);
  }
}
