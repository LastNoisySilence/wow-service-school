import {
  Component, OnDestroy, ElementRef,
  ViewChild, AfterViewInit
} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements AfterViewInit, OnDestroy {

  userInfo: any = {
    type: 'Контакты',
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  private sub: any;
  @ViewChild('name') nameInput: ElementRef;
  isHideMessageInput: boolean = false;
  subscribeTitle: string = 'Напишите нам';
  isSent: boolean = false;
  constructor(private _data: DataService, private route: ActivatedRoute) {
  }


  ngAfterViewInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params.email) {
        this.userInfo.type = 'Подписка';
        this.userInfo.email = params.email;
        this.subscribeTitle = 'Подпишитесь на нас';
        this.isHideMessageInput = true;
        this.nameInput.nativeElement.focus();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    this._data.postUserData(this.userInfo).subscribe(() => this.isSent = true, console.error);
  }

}
