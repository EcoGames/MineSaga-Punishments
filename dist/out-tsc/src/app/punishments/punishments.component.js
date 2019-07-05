import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' };
var theDate = new Date().toLocaleDateString('en-us', options);
const PUNISHMENT_DATA = [
    { punUser: 'first', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
    { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 2, reason: "I'm a reason" },
    { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
    { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 3, reason: "I'm a reason" },
    { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
    { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 2, reason: "I'm a reason" },
    { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
    { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 2, reason: "I'm a reason" },
    { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 3, reason: "I'm a reason" },
    { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
    { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
    { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
    { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
    { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
    { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
    { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
    { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
    { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
    { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
    { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
    { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
    { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
    { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
    { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
    { punUser: 'hello', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
];
let PunishmentsComponent = class PunishmentsComponent {
    constructor() {
        this.displayedColumns = ['punUser', 'punBy', 'date', 'priorOffenses', 'reason'];
        this.dataSource = new MatTableDataSource(PUNISHMENT_DATA);
        this.cache = PUNISHMENT_DATA;
    }
    ngOnInit() {
        this.clearCache();
    }
    clearCache() {
        setInterval(function () {
            console.log("clearing cache");
            this.cache = {};
        }, 1000 * 60 * 10);
    }
};
PunishmentsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-punishments',
        templateUrl: './punishments.component.html',
        styleUrls: ['./punishments.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], PunishmentsComponent);
export { PunishmentsComponent };
//# sourceMappingURL=punishments.component.js.map