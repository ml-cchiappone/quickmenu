import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/service.index';

@Component({
  templateUrl: './recover.component.html',
})
export class RecoverComponent implements OnInit {
  form: FormGroup;
  alertSuccess: boolean = false;
  textSuccess: boolean = false;
  alertError: boolean = false;
  alertErrorServer: boolean = false;
  formView: boolean = true;
  buttonSend: boolean = true;
  spinner: boolean = false;
  userEmail: String = '';

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
    });
  }

  recoverPassword() {
    if (!this.form.valid) {
      return;
    }
    this.showSpinner();
    this.alertError = false;
    try {
      this.userService.recoverPassword(this.form.value).subscribe(
        (resp) => {
          this.hiddenSpinner();
          this.formView = false;
          this.alertSuccess = true;
          return;
        },
        (err) => {
          this.hiddenSpinner();
          if (err.status === 401) {
            this.alertError = true;
            return;
          }
          this.alertErrorServer = true;
          return;
        }
      );
    } catch {
      this.hiddenSpinner();
      this.alertError = true;
      return;
    }
  }

  showSpinner() {
    this.buttonSend = false;
    this.spinner = true;
  }

  hiddenSpinner() {
    this.buttonSend = true;
    this.spinner = false;
  }
}
