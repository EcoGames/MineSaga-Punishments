import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";
let AuthGuard = class AuthGuard {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivate(next, state) {
        if (!this.authService.isLoggedIn) {
            this.router.navigate(['login']);
        }
        return true;
    }
};
AuthGuard = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [AuthenticationService, Router])
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map