import {Component, OnDestroy, OnInit} from '@angular/core';
import {Trainer} from "../../../entities/trainer";
import {DataService} from "../../../services/data.service";
import {EventService} from "../../../services/event.service";

declare let UIkit, $: any;

@Component({
  selector: 'app-new-trainer-modal',
  templateUrl: './new-trainer-modal.component.html',
  styleUrls: ['./new-trainer-modal.component.css']
})
export class NewTrainerModalComponent implements OnDestroy, OnInit {
  ngOnInit(): void {
    $('#AddModal').on('beforehide', () => {
      this.clearData();
    });
  }

  ngOnDestroy(): void {
    $('#AddModal').remove();
  }

  trainer: Trainer = new Trainer();
  isEditMode: boolean = false;
  defaultImageSrc: string = '/static/emptyImage.png';

  constructor(private _data: DataService, private _event: EventService) {
    _event.onTrainerEdit.subscribe((trainer: Trainer) => {
      this.trainer = trainer;
      this.defaultImageSrc = trainer.photoUrl.length > 0
        ? trainer.photoUrl
        : '/static/emptyImage.png';
      UIkit.modal('#AddModal').show();
      this.isEditMode = true;
    });
  }

  toolbarButtons = [
    'bold', 'italic', 'underline',
    'fontSize', 'insertHR', 'color',
    '|', 'paragraphFormat', 'align',
    'formatOL', 'formatUL', 'undo',
    'redo', 'clearFormatting'
  ];

  public options: Object = {
    zIndex: 2501,
    language: 'ru',
    placeholderText: 'О тренере...',
    toolbarInline: false,
    charCounterCount: false,
    quickInsertButtons: ['ul', 'ol', 'hr'],
    toolbarButtons: this.toolbarButtons,
    toolbarButtonsMD: this.toolbarButtons,
    toolbarButtonsXS: this.toolbarButtons,
    toolbarButtonsSM: this.toolbarButtons
  };

  uploadImage(image: any) {
    let bar = $("#progressbar")[0];

    UIkit.upload('.image-upload', {
      url: '/upload',
      multiple: true,
      params: {
        type: 'photo'
      },
      error: function () {
        console.error('error', arguments);
      },
      complete: (resp) => {
        this.trainer.photoUrl =
          this.defaultImageSrc = '/images/' + resp.responseJSON[0].filename;
        bar.setAttribute('hidden', 'hidden');
      },
      loadStart: function (e) {
        bar.removeAttribute('hidden');
        bar.max = e.total;
        bar.value = e.loaded;
      },
      progress: function (e) {
        bar.max = e.total;
        bar.value = e.loaded;
      },
      loadEnd: function (e) {
        bar.max = e.total;
        bar.value = e.loaded;
      }
    });
  }

  add() {
    this._data.addTrainer(this.trainer).subscribe(
      response => {
        this.trainer._id = response.json()._id;
        this._event.addTrainer(this.trainer);
        UIkit.modal('#AddModal').hide();
        this.clearData();
      }, error => console.error(error)
    );
  }

  update() {
    this._data.editTrainer(this.trainer).subscribe(
      () => {
        UIkit.modal('#AddModal').hide();
        this.clearData();
      }, error => console.error(error)
    );
  }

  clearData() {
    this.trainer = new Trainer();
    this.defaultImageSrc = '/static/emptyImage.png';
    this.isEditMode = false;
  }
}
