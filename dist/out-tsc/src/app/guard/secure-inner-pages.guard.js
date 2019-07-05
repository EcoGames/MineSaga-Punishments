import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";
let SecureInnerPagesGuard = class SecureInnerPagesGuard {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivate(next, state) {
        if (this.authService.isLoggedIn) {
            this.router.navigate(['/account']);
            return false;
        }
        return true;
    }
};
SecureInnerPagesGuard = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [AuthenticationService, Router])
], SecureInnerPagesGuard);
export { SecureInnerPagesGuard };
//# sourceMappingURL=secure-inner-pages.guard.js.map