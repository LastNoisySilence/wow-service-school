import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Component, ViewChild } from '@angular/core';
declare const UIkit: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('loginForm') loginForm: NgForm; 

  user: any = {
    username: '',
    password: ''
  };

  isIncorrectUserData: Boolean = false;

  constructor(private _data: DataService, private _router: Router) { }

  login() {
    this.isIncorrectUserData = false;
    this._data.login(this.user).subscribe(() => this._router.navigate(['/admin-panel/news-page']), error => {
      this.isIncorrectUserData = true;
      UIkit.notification("Неправильный логин или пароль.", {status: 'danger'});
    });
  }
}
