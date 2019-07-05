import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json'
//   })
// };
const mojangAPIURLSPOST = [
    "https://api.mojang.com/profiles/minecraft",
];
let PunishmentService = class PunishmentService {
    constructor(afs, http) {
        this.afs = afs;
        this.http = http;
        this.punishCollection = afs.collection("punishments");
    }
    getUserUUID(username) {
        var data = [username, "nonExistingPlayer"];
        return this.http.post(mojangAPIURLSPOST[0], data);
    }
    addPunishment({ punUser, punBy, date, priorOffenses, reason }) {
        this.punishCollection.add({
            punUser,
            punBy,
            date,
            priorOffenses,
            reason
        });
    }
    deletePunishment(doc) {
        doc.delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    }
};
PunishmentService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [AngularFirestore, HttpClient])
], PunishmentService);
export { PunishmentService };
//# sourceMappingURL=punishment.service.js.map