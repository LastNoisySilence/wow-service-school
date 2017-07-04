import { GoogleAnalyticsEventsService } from './../../../services/google-analytics-events.service';
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Trainer} from "../../../entities/trainer";
import {Event} from "../../../entities/event";
declare let UIkit: any;

@Component({
  selector: 'app-trainer-item',
  templateUrl: './trainer-item.component.html',
  styleUrls: ['./trainer-item.component.css']
})

export class TrainerItemComponent {

  @Input() trainer: Trainer;
  @Input() events: Event[];
  @Input() currentTrainer: Trainer;
  @Output() onCurrentTrainerChange: EventEmitter<Trainer> = new EventEmitter();

  constructor(private _ga: GoogleAnalyticsEventsService) {}

  openTrainerDetails(trainer: Trainer) {
    this._ga.emitEvent('Тренер', 'Открыто: ' + trainer.fullName, 'Модальное окно тренера', 10);
    this.currentTrainer = trainer;
    this.currentTrainer.events = this.getEventByTrainer();
    this.onCurrentTrainerChange.emit(this.currentTrainer);
    UIkit.modal('#trainerDetailModal').show();
  }

  getEventByTrainer() {
    return this.events.filter((event: Event) => {
      return event.trainerId === this.trainer._id;
    });
  }

  shortDescription(text: string) {
    return text.length > 250 ? text.substring(0, 250) + '...' : text;
  }

}
