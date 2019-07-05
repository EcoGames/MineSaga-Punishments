import * as tslib_1 from "tslib";
import { Component, HostListener } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { AuthenticationService } from './services/authentication.service';
let AppComponent = class AppComponent {
    constructor(auth, titleService, router, activatedRoute) {
        this.auth = auth;
        this.titleService = titleService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.title = 'MineSaga Punishment';
    }
    ngOnInit() {
        const appTitle = this.titleService.getTitle();
        this.router
            .events.pipe(filter(event => event instanceof NavigationEnd), map(() => {
            const child = this.activatedRoute.firstChild;
            if (child.snapshot.data['title']) {
                return child.snapshot.data['title'];
            }
            return appTitle;
        })).subscribe((ttl) => {
            this.titleService.setTitle(ttl);
        });
    }
    isAtTopOfPage() {
        return document.documentElement.scrollTop == 0;
    }
};
tslib_1.__decorate([
    HostListener("window:scroll", ["$event"]),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppComponent.prototype, "isAtTopOfPage", null);
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [AuthenticationService, Title, Router, ActivatedRoute])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map