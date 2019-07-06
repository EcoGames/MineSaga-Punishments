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

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    public auth: AuthenticationService,
    public fb: FormBuilder,
    public punishService: PunishmentService
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group(
      {
        mcUsername: new FormControl('', [
          Validators.required,
          this.checkIfMCUserNameIsValid
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
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

  checkIfMCUserNameIsValid(control: AbstractControl) {
    if (control.value === '') {
      return;
    }
    if (this.punishService.getUserUUID(control.value) == null) {
      return { invalidMCUsername: true };
    }
    return null;
  }

  signUp() {
    this.auth.signUp(
      this.email.value,
      this.password.value,
      this.mcUsername.value
    );
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
