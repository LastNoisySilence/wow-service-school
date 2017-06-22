import {Component} from '@angular/core';
import {ConsultingCategory} from "../../../entities/consultingCategory";
import {Consulting} from "../../../entities/consulting";
import {DataService} from "../../../services/data.service";
import {EventService} from "../../../services/event.service";
import _ from 'lodash';


@Component({
  selector: 'app-consulting-list',
  templateUrl: './consulting-list.component.html',
  styleUrls: ['./consulting-list.component.css']
})
export class ConsultingListComponent {

  consultingList: Consulting[] = [];
  categoryList: ConsultingCategory[] = [];
  isReadonlyTitle: boolean = true;

  constructor(private _data: DataService, private _event: EventService) {
    this.loadData();
    _event.onConsultingCategoryAdd.subscribe((category: ConsultingCategory) => {
      if(this.categoryList.length === 0) {
        this.loadData();
      }
      this.categoryList.push(category);
    });
    _event.onConsultingUpdate.subscribe(() => {
      this.loadData();
    });
    _event.onConsultingAdd.subscribe((consulting: Consulting) => {
      this.consultingList.push(consulting);
      this.categoryList.map((category: ConsultingCategory) => {
        if (category._id === consulting.categoryId)
          category.listOfConsultingIds.push(consulting._id);
      });
      if(this.consultingList.length === 0) {
        this.loadData();
      }
    });
    _event.onConsultingDelete.subscribe((consulting: Consulting) => {
      this._data.deleteConsulting(consulting).subscribe(() => {
        _.remove(this.consultingList, (c: Consulting) => {
          return c === consulting;
        });
        this.categoryList.map((category: ConsultingCategory) => {
          _.remove(category.listOfConsultingIds, (id) => {
            return id === consulting._id;
          });
        });
      }, console.error);
    });
  }

  loadData() {
    this._data.getConsulting().subscribe((consulting: Consulting[]) => {
      this.consultingList = consulting;
    }, console.error);
    this._data.getConsultingCategory().subscribe((categories: ConsultingCategory[]) => {
      this.categoryList = categories;
    }, console.error);
  }

  getConsultingListByCategory(category: ConsultingCategory) {
    return this.consultingList.filter(consulting => {
      return category.listOfConsultingIds.filter(id => {
        return consulting._id === id;
      })[0];
    });
  }

  getFullOfConsultingCategory() {
    return this.categoryList.filter((category: ConsultingCategory) => {
      return category.listOfConsultingIds.length > 0;
    });
  }

  renameCategory(category: ConsultingCategory) {
    this.isReadonlyTitle = true;
    this._data.editConsultingCategory(category).subscribe(
      () => {
      }, console.error
    )
  }

  removeCategory(category: ConsultingCategory) {
    this._data.deleteConsultingCategory(category).subscribe(
      () => {
        this._data.getConsultingCategory().subscribe((categoryList: ConsultingCategory[]) => {
          this.categoryList = categoryList;
        }, console.error);
      },
      console.error
    );
  }
}
