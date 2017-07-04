import { GoogleAnalyticsEventsService } from './../../../services/google-analytics-events.service';
import {Component, OnDestroy, Input} from '@angular/core';
import {Trainer} from '../../../entities/trainer';
import {Event} from '../../../entities/event';
import _ from 'lodash';
declare const $, UIkit: any;

@Component({
  selector: 'app-trainer-modal',
  templateUrl: './trainer-modal.component.html',
  styleUrls: ['./trainer-modal.component.css']
})
export class TrainerModalComponent implements OnDestroy {
  getTrainerEventsInChunks() {
    return _.chunk(this.trainer.events, 3);
  };

  constructor(private _ga: GoogleAnalyticsEventsService) {}

  // tslint:disable-next-line:member-ordering
  @Input() trainer: Trainer;
  currentEvent: Event;

  ngOnDestroy() {
    $('#trainerDetailModal').remove();
    $('#subscriptionModal').remove();
  }

  openEventDetails(event) {
    this._ga.emitEvent('Мероприятие', 'Открыто: ' + event.title, 'Модальное окно мероприятия', 10);
    this.currentEvent = event;
    UIkit.modal('#eventDetailModal').show();
  }
}
