import { DataService } from './../../../services/data.service';
import { ConsultingCategory } from './../../../entities/consultingCategory';
import { Consulting } from './../../../entities/consulting';
import { Component } from '@angular/core';
declare const $, UIkit: any;

@Component({
  selector: 'app-consulting-list',
  templateUrl: './consulting-list.component.html',
  styleUrls: ['./consulting-list.component.css']
})
export class ConsultingListComponent {

  consultingList: Consulting[] = [];
  categoryList: ConsultingCategory[] = [];
  consultingInModal: Consulting;

  constructor(private _data: DataService) {
    _data.getConsulting().subscribe(
      (consultingList: Consulting[]) => this.consultingList = consultingList,
      console.error
    );
    _data.getConsultingCategories().subscribe(
      (categoryList: ConsultingCategory[]) => this.categoryList = categoryList,
      console.error
    );
  }

  getFullOfCunsultingCategories() {
    return this.categoryList.filter(category => category.listOfConsultingIds.length > 0);
  }

  getConsultingListByCategory(category: ConsultingCategory) {
    return this.consultingList.filter(consulting => {
      return category.listOfConsultingIds.filter(id => {
        return consulting._id === id;
      })[0];
    });
  }

  changeConsultingInModal(consulting: Consulting) {
    console.log('List', consulting);
    this.consultingInModal = consulting;
  }
}
