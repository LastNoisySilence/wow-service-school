import {Component} from '@angular/core';
import {DataService} from "../../../services/data.service";
import {EventService} from "../../../services/event.service";
import {Trainer} from "../../../entities/trainer";

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.css']
})
export class TrainerListComponent {

  trainerList: Trainer[] = [];

  constructor(private _data: DataService, private _event: EventService) {
    _data.getTrainers().subscribe((trainers: Trainer[]) => this.trainerList = trainers);
    _event.onTrainerAdd.subscribe((trainer: Trainer) => {
      this.trainerList.push(trainer);
    });
    _event.onTrainerDelete.subscribe((trainer: Trainer) => {
      this.trainerList.splice(this.trainerList.indexOf(trainer), 1);
    });
  }
}
