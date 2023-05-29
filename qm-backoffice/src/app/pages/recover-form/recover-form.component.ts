import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/service.index';

@Component({
  selector: 'app-recover-form',
  templateUrl: './recover-form.component.html',
})
export class RecoverFormComponent implements OnInit {
  paramEmail: string;
  paramToken: string;
  param2: string;
  formPassword: FormGroup;
  buttonSend: boolean = true;
  spinner: boolean = false;
  alertSuccess: boolean = false;
  alertError: boolean = false;
  alertErrorServer: boolean = false;
  formView: boolean = true;
  token: string;

  constructor(
    private route: ActivatedRoute,
    private readonly fb: FormBuilder,
    public userService: UserService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.paramEmail = params['email'];
      this.token = params['token'];
    });
    this.formPassword = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const email = this.paramEmail;
  }

  validateAlert(input) {
    if (input.invalid && (input.dirty || input.touched)) {
      return true;
    }
    return false;
  }

  validateInput(input) {
    if (input.invalid && (input.dirty || input.touched)) {
      return 'is-invalid';
    }
    if (input.pending) {
      return 'is-invalid';
    }
    return '';
  }

  recoverPassword() {
    if (!this.formPassword.valid) {
      this.activeControlForm(this.formPassword);
      return;
    }

    this.spinner = true;
    this.buttonSend = false;
    this.alertError = false;
    const valuesForm = this.formPassword.getRawValue();

    if (valuesForm.newPassword !== valuesForm.confirmPassword) {
      this.spinner = false;
      this.buttonSend = true;
      this.alertError = true;
      return;
    }

    const email = this.paramEmail;
    const body = {
      email: email,
      password: valuesForm.newPassword,
    };

    this.updatePassword(body);
  }

  activeControlForm(form) {
    const controls = form.controls;

    Object.keys(controls).forEach((key) => {
      if (controls[key].status === 'INVALID') {
        controls[key].markAsTouched();
      }
    });
  }

  updatePassword(body: any) {
    body.token = this.token;
    try {
      this.userService.recoverPassword(body).subscribe(
        (resp) => {
          this.formView = false;
          this.alertSuccess = true;
        },
        (err) => {
          this.formView = false;
          this.alertErrorServer = true;
        }
      );
    } catch {
      this.formView = false;
      this.alertErrorServer = true;
    }
  }
}
