import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';

import * as firebase from 'firebase/app';

// punishment service
import { PunishmentService } from '../services/punishment.service';
import { Punishment } from '../services/punishment.model';
import { MCUser } from '../services/mcUser.model';

@Component({
  selector: 'app-punish-form',
  templateUrl: './punish-form.component.html',
  styleUrls: ['./punish-form.component.scss']
})
export class PunishFormComponent implements OnInit {
  // the form group itself
  punishForm: FormGroup;
  // an instance of the punisheduser inferface
  punUserUUID: string;
  punUserAvatarURL: string;
  // punish-form elements
  nameElement: HTMLElement;
  avatarImgElement: HTMLElement;

  punishment: Punishment;

  // the max file size for the evidence (5MB)
  maxFileSize: number = 5 * 1024 * 1024;

  constructor(
    private fb: FormBuilder,
    public punishService: PunishmentService
  ) {}

  ngOnInit() {
    // initialize variables
    this.avatarImgElement = document.getElementById('plrAvatar');
    this.nameElement = document.getElementById('plrNameSpan');
    // create the form controls
    this.punishForm = this.fb.group({
      plrName: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      offenseCount: new FormControl('', [Validators.required]),
      evidenceUpload: new FormControl(undefined, [
        FileValidator.maxContentSize(this.maxFileSize)
      ])
    });
  }

  // get the plrName form
  public get plrName() {
    return this.punishForm.get('plrName');
  }

  // get the reason form
  public get reason() {
    return this.punishForm.get('reason');
  }

  // get the offenseCount form
  public get offenseCount() {
    return this.punishForm.get('offenseCount');
  }

  // get the evidenceUpload form
  public get evidenceUpload() {
    return this.punishForm.get('evidenceUpload');
  }

  // submit the new punishment form, called when punish-form is submitted
  public async submitPunishment() {
    const response: MCUser = await this.punishService.getUserUUID(
      this.plrName.value
    );

    if (response == null) {
      alert('the username is not valid!');
      return;
    }
    this.punUserUUID = response.id;
    this.punUserAvatarURL = await this.punishService.getUserAvatar(response.id);
    this.nameElement.innerText = response.name;
    this.avatarImgElement.setAttribute('src', this.punUserAvatarURL);

    this.punishment = {
      punUser: response.name,
      punBy: firebase.auth().currentUser.displayName,
      priorOffenses: this.offenseCount.value,
      date: Date.now(),
      reason: this.reason.value
    };
    this.punishService.addPunishment(
      this.punishment,
      this.evidenceUpload,
      this.punUserUUID
    );
  }
}
