import {Component, OnDestroy, Input, OnInit} from '@angular/core';
import {Trainer} from "../../../entities/trainer";
import {Event} from "../../../entities/event";
declare let $, UIkit: any;

@Component({
  selector: 'app-trainer-modal',
  templateUrl: './trainer-modal.component.html',
  styleUrls: ['./trainer-modal.component.css']
})
export class TrainerModalComponent implements OnDestroy, OnInit {
  ngOnInit(): void {
    $('#eventDetailModal').on('hidden', () => {
      UIkit.modal('#trainerDetailModal').show();
    });
  }

  @Input() trainer: Trainer;
  currentEvent: Event;

  ngOnDestroy() {
    $('#trainerDetailModal').remove();
  }

  openEventDetails(event){
    this.currentEvent = event;
    UIkit.modal('#eventDetailModal').show();
  }


}
