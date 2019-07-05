import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
let SignupComponent = class SignupComponent {
    constructor(auth, fb) {
        this.auth = auth;
        this.fb = fb;
    }
    ngOnInit() {
        this.signupForm = this.fb.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]),
            confPassword: new FormControl('', [Validators.required])
        }, { validators: this.checkIfMatchingPasswords('password', 'confPassword') });
    }
    checkIfMatchingPasswords(passwordKey, passwordConfirmationKey) {
        return (group) => {
            let passwordInput = group.controls[passwordKey], passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({ notEquivalent: true });
            }
            else {
                return passwordConfirmationInput.setErrors(null);
            }
        };
    }
    signUp() {
        this.auth.signUp(this.email.value, this.password.value);
    }
    googleSignIn() {
        this.auth.googleSignin();
    }
    get email() {
        return this.signupForm.get('email');
    }
    get password() {
        return this.signupForm.get('password');
    }
    get confPassword() {
        return this.signupForm.get('confPassword');
    }
};
SignupComponent = tslib_1.__decorate([
    Component({
        selector: 'app-signup',
        templateUrl: './signup.component.html',
        styleUrls: ['./signup.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [AuthenticationService, FormBuilder])
], SignupComponent);
export { SignupComponent };
//# sourceMappingURL=signup.component.js.map