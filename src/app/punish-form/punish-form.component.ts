import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

// punishment service
import { PunishmentService } from "../services/punishment.service";
import { MCUser } from '../services/mcUser.model';

@Component({
  selector: 'app-punish-form',
  templateUrl: './punish-form.component.html',
  styleUrls: ['./punish-form.component.scss']
})
export class PunishFormComponent implements OnInit {
  punishForm: FormGroup;

  userUUID: string;
  userAvatarImg: HTMLElement;
  userName: HTMLElement;
  userAvatar: string;

  constructor(private fb: FormBuilder, public punishService: PunishmentService) { }

  ngOnInit() {
    this.userAvatarImg = document.getElementById('plrAvatar');
    this.userName = document.getElementById('plrNameSpan');
    this.punishForm = this.fb.group({
      plrName: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      offenseCount: new FormControl('', [Validators.required])
    });
  }

  changeOffenseCount(event: any) {
    console.log(event.value);
  }

  public get plrName() {
    return this.punishForm.get('plrName');
  }

  public get reason() {
    return this.punishForm.get('reason');
  }

  public get offenseCount() {
    return this.punishForm.get('offenseCount');
  }

  public submitPunishment() {

    this.punishService.getUserUUID(this.plrName.value, (response) => {
      if (response == null) {
        alert("the username is not valid!");
        return;
      }
      this.userUUID = response.id;
      this.userAvatar = this.punishService.getUserAvatar(response.id);
      this.userName.innerHTML = this.plrName.value;
      this.userAvatarImg.setAttribute('src', this.userAvatar);
    })

  }


}
