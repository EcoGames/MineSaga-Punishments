import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl
} from '@angular/forms';

import { AuthenticationService } from '../services/authentication.service';
import { PunishmentService } from '../services/punishment.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  correctUsername: string;

  constructor(
    public auth: AuthenticationService,
    public fb: FormBuilder,
    public punishServ: PunishmentService,
    public http: HttpClient
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group(
      {
        mcUsername: new FormControl('', [
          Validators.required,
          MCAccountValidatorService.username(this.http)
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
        ]),
        confPassword: new FormControl('', [Validators.required])
      },
      {
        validators: [this.checkIfMatchingPasswords('password', 'confPassword')]
      }
    );
  }

  checkIfMatchingPasswords(
    passwordKey: string,
    passwordConfirmationKey: string
  ) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
      const passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      }
      return passwordConfirmationInput.setErrors(null);
    };
  }

  async signUp() {
    this.correctUsername = await this.punishServ
      .getUserUUID(this.mcUsername.value)
      .then(resp => {
        this.auth.signUp(this.email.value, this.password.value, resp.name);
        return resp.name;
      });
  }

  googleSignIn() {
    this.auth.googleSignin();
  }

  public get mcUsername() {
    return this.signupForm.get('mcUsername');
  }

  public get email() {
    return this.signupForm.get('email');
  }

  public get password() {
    return this.signupForm.get('password');
  }

  public get confPassword() {
    return this.signupForm.get('confPassword');
  }
}

export class MCAccountValidatorService {
  static username(http: HttpClient) {
    return (control: AbstractControl) => {
      const mcUsername = control.value;
      if (mcUsername === '') {
        return;
      }
      return http
        .get(
          'https://cors-anywhere.herokuapp.com/https://api.mojang.com/users/profiles/minecraft/' +
            mcUsername
        )
        .subscribe(data => {
          if (data != null) {
            return control.setErrors(null);
          } else {
            return control.setErrors({ mcUsernameInvalid: true });
          }
        });
    };
  }
}
