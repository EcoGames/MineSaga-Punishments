import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
// punishment service
import { PunishmentService } from "../services/punishment.service";
let PunishFormComponent = class PunishFormComponent {
    constructor(fb, punishServ) {
        this.fb = fb;
        this.punishServ = punishServ;
    }
    ngOnInit() {
        this.punishForm = this.fb.group({
            plrName: new FormControl('', [Validators.required]),
            reason: new FormControl('', [Validators.required]),
            offenseCount: new FormControl('', [Validators.required])
        });
    }
    changeOffenseCount(event) {
        console.log(event.value);
    }
    // validateOffense(offenseCountKey: string) {
    //   return (group: FormGroup) => {
    //     let offenseCountInput = group.controls[offenseCountKey];
    //     if (parseInt(offenseCountInput.value) > 3 || parseInt(offenseCountInput.value) < 0) {
    //       return offenseCountInput.setErrors({ invalidOffense: true });
    //     }
    //     return offenseCountInput.setErrors(null);
    //   }
    // }
    get plrName() {
        return this.punishForm.get('plrName');
    }
    get reason() {
        return this.punishForm.get('reason');
    }
    get offenseCount() {
        return this.punishForm.get('offenseCount');
    }
    submitPunishment() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let plrNameValue = this.plrName.value, reasonValue = this.reason.value, offenseCountValue = this.offenseCount.value;
            yield this.punishServ.getUserUUID(plrNameValue).subscribe(result => {
                console.log(JSON.parse(result));
            });
        });
    }
};
PunishFormComponent = tslib_1.__decorate([
    Component({
        selector: 'app-punish-form',
        templateUrl: './punish-form.component.html',
        styleUrls: ['./punish-form.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder, PunishmentService])
], PunishFormComponent);
export { PunishFormComponent };
//# sourceMappingURL=punish-form.component.js.map