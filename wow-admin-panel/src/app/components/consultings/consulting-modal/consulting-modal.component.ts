import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {ConsultingCategory} from "../../../entities/consultingCategory";
import {DataService} from "../../../services/data.service";
import {Consulting} from "../../../entities/consulting";
import {EventService} from "../../../services/event.service";
import {error} from "util";
declare let UIkit, $: any;

@Component({
  selector: 'app-consulting-modal',
  templateUrl: './consulting-modal.component.html',
  styleUrls: ['./consulting-modal.component.css']
})

export class ConsultingModalComponent implements OnDestroy, OnInit {
  @Input() categories: ConsultingCategory[];
  newCategory: ConsultingCategory = new ConsultingCategory();
  newConsulting: Consulting = new Consulting();
  forms: any[] = [
    {title: 'Описание услуги', path: 'description'},
    {title: 'Результат', path: 'result'}
  ];

  selectedForm: any = this.forms[0];
  isEditMode: boolean = false;
  isCategoryAdd: boolean = false;

  constructor(private _data: DataService, private _event: EventService) {
    _event.onConsultingEdit.subscribe((consulting: Consulting) => {
      this.isEditMode = true;
      this.newConsulting = consulting;
      UIkit.modal('#AddModal').show();
    });
  }

  addNewCategory() {
    this._data.addConsultingCategory(this.newCategory).subscribe(
      (category) => {
        this.newCategory._id = category.json()._id;
        this._event.addConsultingCategory(this.newCategory);
        this.newCategory = new ConsultingCategory();
        UIkit.modal('#newConsultingCategoryModal').hide();
      }, console.error
    )
  };

  add() {
    this._data.addConsulting(this.newConsulting).subscribe(
      (consulting) => {
        this.newConsulting._id = consulting.json()._id;
        this._event.addConsulting(this.newConsulting);
        UIkit.modal('#AddModal').hide();
      }, console.error
    );
  };

  update() {
    this._data.editConsulting(this.newConsulting).subscribe(
      () => {
        this._event.updateConsulting(this.newConsulting);
        UIkit.modal('#AddModal').hide();
      }, console.error
    )
  };

  switchEditor(editForm) {
    this.selectedForm = editForm;
    $('.fr-placeholder')[0].innerHTML = this.selectedForm.title;
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
        editor.$placeholder[0].innerHTML = this.selectedForm.title;
      },
      'froalaEditor.initialized': (e, editor) => {
        setTimeout(() => {
          editor.$placeholder[0].innerHTML = this.selectedForm.title;
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

  openNewCategoryModal() {
    this.isCategoryAdd = true;
    UIkit.modal('#newConsultingCategoryModal').show();
  }

  ngOnInit(): void {
    $('#AddModal').on('beforehide', () => {
      if(!this.isCategoryAdd) {
        this.isCategoryAdd = false;
        this.resetData();
      }
    });
    $('#newConsultingCategoryModal').on('beforehide', () => {
      UIkit.modal('#AddModal').show();
    });
  }

  ngOnDestroy(): void {
    $('#AddModal').remove();
    $('#newConsultingCategoryModal').remove();
  }

  resetData() {
    this.newConsulting = new Consulting();
    this.isEditMode = false;
    this.selectedForm = this.forms[0];
  }
}
