import {Component, Input} from '@angular/core';
import {Trainer} from "../../../entities/trainer";
import {DataService} from "../../../services/data.service";
import {EventService} from "../../../services/event.service";

@Component({
  selector: 'app-trainer-item',
  templateUrl: './trainer-item.component.html',
  styleUrls: ['./trainer-item.component.css']
})
export class TrainerItemComponent {

  @Input() trainer: Trainer;

  constructor(private _data: DataService, private _event: EventService) {
  }

  deleteTrainer() {
    this._data.deleteTrainer(this.trainer).subscribe(() =>
        this._event.deleteTrainer(this.trainer),
      error => console.error('Trainer delete error', error)
    );
  }

  editTrainer() {
    this._event.editTrainer(this.trainer);
  }
}
