import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-punish-form',
  templateUrl: './punish-form.component.html',
  styleUrls: ['./punish-form.component.scss']
})
export class PunishFormComponent implements OnInit {
  punishForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.punishForm = this.fb.group({
      plrName: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      offenseCount: new FormControl('', [Validators.required])
    });
  }

  changeOffenseCount(event: any) {
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

  public get plrName() {
    return this.punishForm.get('plrName');
  }

  public get reason() {
    return this.punishForm.get('reason');
  }

  public get offenseCount() {
    return this.punishForm.get('offenseCount');
  }


}
