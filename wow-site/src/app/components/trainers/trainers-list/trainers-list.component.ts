import {Component} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {Trainer} from '../../../entities/trainer';

@Component({
  selector: 'app-trainers-list',
  templateUrl: './trainers-list.component.html',
  styleUrls: ['./trainers-list.component.css']
})
export class TrainersListComponent {

  trainers: Trainer[] = [];
  events: Event[] = [];
  trainerInModal: Trainer;

  constructor(private _data: DataService) {
    _data.getTrainers().subscribe((trainers: Trainer[]) => {
      this.trainers = trainers;
      this.trainerInModal = this.trainers[0];
    }, error => console.error(error));
    _data.getEvents().subscribe((events: Event[]) => {
      this.events = events;
    }, error => console.error(error));
  }

  changeTrainerInModal(trainer: Trainer) {
    this.trainerInModal = trainer;
  }
}
