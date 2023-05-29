import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/service.index';

interface AuthToken {
  token: string;
  userAuth: UserLoginData;
}
interface UserLoginData {
  _id: string;
}

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  remember: boolean = false;
  alertError: boolean = false;
  alertErrorServer: boolean = false;
  buttonLogin: boolean = true;
  spinner: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required),
    });
  }

  login() {
    if (!this.form.valid) {
      console.log('Invalid user or password');
    }
    this.showSpinner();
    this.alertError = false;
    this.alertErrorServer = false;
    let params = this.route.snapshot.queryParams;
    this.userService.login(this.form.value).subscribe(
      (result: AuthToken) => {
        this.hiddenSpinner();
        localStorage.setItem('jwt-token', result.token);
        localStorage.setItem('user', JSON.stringify(result.userAuth));
        this.router.navigate(['/home']);

        // @@ TODO: removed for the moment, queryparams always brings /grid, reason is unknown
        /*if (params['redirectURL']) {
          this.router.navigateByUrl(params['redirectURL'])
            .catch(() => this.router.navigate(['/home']));
        } else {
          this.router.navigate(['/home']);
        }*/
      },
      (err) => {
        this.handleUnauthorizedError(err);
      }
    );
  }

  handleUnauthorizedError(err) {
    this.hiddenSpinner();
    if (err.status === 401) {
      this.alertError = true;
      return;
    }
    this.alertErrorServer = true;
    return;
  }

  showSpinner() {
    this.buttonLogin = false;
    this.spinner = true;
  }

  hiddenSpinner() {
    this.buttonLogin = true;
    this.spinner = false;
  }
}
