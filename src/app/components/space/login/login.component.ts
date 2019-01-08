import { Component, OnInit } from '@angular/core';
import * as services from 'app/services/_index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as interfaces from 'app/interfaces/_index';
import * as actions from 'app/store/actions/_index';

@Component({
  moduleId: module.id,
  selector: 'm-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<interfaces.AppState>,
    private auth: services.AuthService,
    public pageTitle: services.PageTitleService
  ) {
    this.pageTitle.setTitle('Login | Mprove');
  }

  // ngOnInit() {
  // localStorage.removeItem('redirect_url');
  // this.auth.login();
  // }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.maxLength(255)])],
      password: [null, Validators.compose([Validators.maxLength(255)])]
    });
  }

  onSubmit(fv: any) {
    this.store.dispatch(
      new actions.LoginUserAction({
        user_id: fv['email'],
        password: fv['password']
      })
    );
  }
}
