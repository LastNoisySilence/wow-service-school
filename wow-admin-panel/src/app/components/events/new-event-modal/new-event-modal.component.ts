import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {Event} from "../../../entities/event";
import {DataService} from "../../../services/data.service";
import {EventService} from "../../../services/event.service";
import {EventsCategory} from "../../../entities/eventsCategory";
import {Trainer} from "../../../entities/trainer";

declare let UIkit, $: any;

@Component({
  selector: 'app-new-event-modal',
  templateUrl: './new-event-modal.component.html',
  styleUrls: ['./new-event-modal.component.css']
})

export class NewEventModalComponent implements OnDestroy, OnInit {
  ngOnInit(): void {
    let datePicker = $('.datepicker-here');
    datePicker.datepicker({
      timepicker: true,
      onSelect: (fd, date) => {
        this.event.date = date;
      }
    });
    datePicker.datepicker().data('datepicker');

    $('#AddModal').on('beforehide', () => {
      if(!this.isCategoryAdd) {
        this.clearData();
        this.isCategoryAdd = true;
      }
    });
  }

  ngOnDestroy(): void {
    $('#AddModal').remove();
    $('#newEventsCategoryModal').remove();
  }

  event: Event = new Event();
  @Input() trainers: Trainer[];
  @Input() categories: EventsCategory[];
  newCategory: EventsCategory = new EventsCategory();
  isEditMode: boolean = false;
  isCategoryAdd: boolean = false;
  defaultImageSrc: string = '/static/emptyImage.png';

  eventTypes: string[] = [
    'Тренинг', 'Семинар',
    'Вебинар', 'Мастер-класс',
    'Конференция', 'Лекция'
  ];

  editForms: any[] = [
    {
      full: 'Целевая аудитория...',
      short: 'Аудитория',
      key: 'audience'
    },
    {
      full: 'Цель мероприятия...',
      short: 'Цель',
      key: 'goal'
    },
    {
      full: 'Программа...',
      short: 'Программа',
      key: 'schedule'
    },
    {
      full: 'Дополнительная информация...',
      short: 'Доп.инфо.',
      key: 'additionalInfo'
    },
  ];
  currentEditKey: string = 'audience';
  selectedForm: any = this.editForms[0];

  constructor(private _data: DataService, private _event: EventService) {
    this.event.type = this.eventTypes[0];
    _event.onEventEdit.subscribe((event: Event) => {
      this.event = event;
      $('.datepicker-here')
        .datepicker()
        .data('datepicker')
        .selectDate(new Date(event.date));
      this.currentEditKey = 'audience';
      this.selectedForm = this.editForms[0];
      this.defaultImageSrc = event.imagePath.length > 0
        ? event.imagePath
        : '/static/emptyImage.png';
      UIkit.modal('#AddModal').show();
      this.isEditMode = true;
    });
  }

  switchEditor(editForm) {
    this.selectedForm = editForm;
    this.currentEditKey = editForm.key;
    $('.fr-placeholder')[0].innerHTML = this.selectedForm.full;
  }

  toolbarButtons = [
    'bold', 'italic', 'underline',
    'fontSize', 'insertHR', 'color',
    '|', 'paragraphFormat', 'align',
    'formatOL', 'formatUL', 'undo',
    'redo', 'clearFormatting'
  ];

  public options: Object = {
    events: {
      'froalaEditor.contentChanged': (e, editor) => {
        editor.$placeholder[0].innerHTML = this.selectedForm.full;
      },
      'froalaEditor.initialized': (e, editor) => {
        setTimeout(() => {
          editor.$placeholder[0].innerHTML = this.selectedForm.full;
        }, 500);
      }
    },
    zIndex: 2501,
    language: 'ru',
    placeholderText: false,
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
      error: function () {
        console.error('error', arguments);
      },
      complete: (resp) => {
        this.event.imagePath =
          this.defaultImageSrc = '/images/' + resp.responseJSON[0].filename;
        setTimeout(function () {
          bar.setAttribute('hidden', 'hidden');
        }, 1000);
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
    this._data.addEvent(this.event).subscribe(
      response => {
        this.event._id = response.json()._id;
        this._event.addEvent(this.event);
        UIkit.modal('#AddModal').hide();
        UIkit.modal('#AddModal').hide();
        this.clearData();
      }, error => console.error(error)
    );
  }

  update() {
    this._data.editEvent(this.event).subscribe(
      () => {
        this._event.updateEvent(this.event);
        UIkit.modal('#AddModal').hide();
        this.clearData();
      }, error => console.error(error)
    );
  }

  openNewCategoryModal() {
    this.isCategoryAdd = true;
    UIkit.modal('#newEventsCategoryModal').show();
  }

  addNewCategory() {
    this._data.addEventsCategory(this.newCategory).subscribe(res => {
      UIkit.modal('#newEventsCategoryModal').hide();
      this.event.categoryId = res.json()._id;
      this._event.addCategory(this.newCategory);
      this._data.getEventsCategory().subscribe(
        (categories: EventsCategory[]) => this.categories = categories
      );
      this.newCategory = new EventsCategory();
      UIkit.modal('#AddModal').show();
    }, error => console.error(error))
  }

  clearData() {
    this.event = new Event();
    this.event.type = this.eventTypes[0];
    $('.datepicker-here')
      .datepicker()
      .data('datepicker')
      .clear();
    this.defaultImageSrc = '/static/emptyImage.png';
    this.isEditMode = false;
  }
}
