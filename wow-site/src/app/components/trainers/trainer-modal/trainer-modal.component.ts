import {Component, OnDestroy, Input, OnInit} from '@angular/core';
import {Trainer} from "../../../entities/trainer";
import {Event} from "../../../entities/event";
import _ from 'lodash';
declare const $, UIkit: any;

@Component({
  selector: 'app-trainer-modal',
  templateUrl: './trainer-modal.component.html',
  styleUrls: ['./trainer-modal.component.css']
})
export class TrainerModalComponent implements OnDestroy, OnInit {
  ngOnInit(): void {
    /*$('#eventDetailModal').on('hidden', () => {
      UIkit.modal('#trainerDetailModal').show();
    });*/
  }

  getTrainerEventsInChunks() {
    return _.chunk(this.trainer.events, 3);
  };

  // tslint:disable-next-line:member-ordering
  @Input() trainer: Trainer;
  currentEvent: Event;

  ngOnDestroy() {
    $('#trainerDetailModal').remove();
    $('#subscriptionModal').remove();
  }

  openEventDetails(event){
    this.currentEvent = event;
    UIkit.modal('#eventDetailModal').show();
  }
}
