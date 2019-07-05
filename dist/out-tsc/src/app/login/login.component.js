import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
let LoginComponent = class LoginComponent {
    constructor(auth, fb) {
        this.auth = auth;
        this.fb = fb;
    }
    ngOnInit() {
        this.loginForm = this.fb.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')])
        });
    }
    signIn() {
        this.auth.login(this.email.value, this.password.value);
    }
    googleSignIn() {
        this.auth.googleSignin();
    }
    get email() {
        return this.loginForm.get('email');
    }
    get password() {
        return this.loginForm.get('password');
    }
};
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [AuthenticationService, FormBuilder])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map