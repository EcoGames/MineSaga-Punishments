import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormArray
} from '@angular/forms';

import * as firebase from 'firebase/app';

// punishment service
import { PunishmentService } from '../services/punishment.service';
import { Punishment } from '../services/punishment.model';
import { MCUser } from '../services/mcUser.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-punish-form',
  templateUrl: './punish-form.component.html',
  styleUrls: ['./punish-form.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ]
})
export class PunishFormComponent implements OnInit {
  punishments: string[] = [
    'Spamming / Chat Flooding / Character Flooding',
    'Spam Encouragement',
    'Double Posting',
    'Staff Disrespect',
    'TP Trapping',
    'Player Disrespect',
    'Racism / Discrimination',
    'Death Threats',
    'Inappropriate Chat Content & Vulgar language',
    'Exploiting or Bug Abuse',
    'Xray',
    'Ban Evasion',
    'Mute Evasion',
    'Alt Limit',
    'Report Abuse and Help OP abuse',
    'Wasting staff time',
    'IRL Trading & Sales of accounts',
    'Staff Impersonation',
    'Advertising',
    'DDoS or Dox Threads or Comedy',
    'Cheating',
    'Inappropriate nickname ',
    'Insiding',
    'Inappropriate username',
    'Auction House Scamming'
  ];
  filteredPunishments: Observable<string[]>;

  // the form group itself
  basicPunishInfo: FormGroup;
  punishEvidenceInfo: FormGroup;
  extraPunishInfo: FormGroup;
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
    public punishService: PunishmentService,
    public router: Router,
    public http: HttpClient
  ) {}

  ngOnInit() {
    // initialize variables & get the html elements
    this.avatarImgElement = document.getElementById('plrAvatar');
    this.nameElement = document.getElementById('plrNameSpan');
    // create the first form controls
    this.basicPunishInfo = this.fb.group({
      usrName: [
        '',
        [Validators.required, MCAccountValidatorService.username(this.http)]
      ],
      punishType: ['', Validators.required],
      selectPunishment: [],
      offenseCount: ['', Validators.required]
    });

    // create the second form controls
    this.punishEvidenceInfo = this.fb.group(
      {
        linkEvidence: this.fb.array([this.fb.group({ linkEvidenceObj: '' })]),
        fileUplEvidence: this.fb.array([this.fb.group({ fileEvidenceObj: '' })])
      },
      {
        validators: this.atLeastOne(Validators.required, [
          'linkEvidence',
          'fileUplEvidence'
        ])
      }
    );

    // create the last form controls
    this.extraPunishInfo = this.fb.group({
      extraInfo: ['']
    });

    // filter the punishments
    this.filteredPunishments = this.selectPunishment.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  atLeastOne = (validator: ValidatorFn, controls: string[] = null) => (
    group: FormGroup
  ): ValidationErrors | null => {
    if (!controls) {
      controls = Object.keys(group.controls);
    }

    const hasAtLeastOne =
      group &&
      group.controls &&
      controls.some(k => !validator(group.controls[k]));

    return hasAtLeastOne
      ? null
      : {
          atLeastOne: true
        };
  };

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.punishments.filter(punishment =>
      punishment.toLowerCase().includes(filterValue)
    );
  }

  // get the plrName form
  public get usrName() {
    return this.basicPunishInfo.get('usrName');
  }

  // get the plrName form
  public get punishType() {
    return this.basicPunishInfo.get('punishType');
  }

  // get the reason form
  public get selectPunishment() {
    return this.basicPunishInfo.get('selectPunishment');
  }

  // get the offenseCount form
  public get offenseCount() {
    return this.basicPunishInfo.get('offenseCount');
  }

  // get the evidenceUpload form
  public get fileUplEvidence() {
    return this.punishEvidenceInfo.get('fileUplEvidence') as FormArray;
  }

  // get link evidence
  public get linkEvidence() {
    return this.punishEvidenceInfo.get('linkEvidence') as FormArray;
  }

  // get extra info
  public get extraInfo() {
    return this.extraPunishInfo.get('extraInfo');
  }

  addLinkEvidence() {
    this.linkEvidence.push(this.fb.group({ linkEvidenceObj: '' }));
  }

  removeLinkEvidence(index) {
    this.linkEvidence.removeAt(index);
  }

  addFileEvidence() {
    this.fileUplEvidence.push(this.fb.group({ fileEvidenceObj: '' }));
  }

  removeFileEvidence(index) {
    this.fileUplEvidence.removeAt(index);
  }

  // submit the new punishment form, called when punish-form is submitted
  public async submitPunishment() {
    const response: MCUser = await this.punishService.getUserUUID(
      this.usrName.value
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
      punType: this.punishType.value,
      priorOffenses: this.offenseCount.value,
      date: Date.now(),
      reason: this.selectPunishment.value,
      extraInfo: this.extraInfo.value
    };
    if (this.fileUplEvidence.value._files == null) {
      console.log("user did link");
      this.punishService.addPunishment(
        this.punishment,
        this.linkEvidence.value,
        this.punUserUUID,
        true
      );
    } else {
      this.punishService.addPunishment(
        this.punishment,
        this.fileUplEvidence,
        this.punUserUUID,
        false
      );
    }
    // TODO: change this method (add if statement?) based on if the user chose to submit a link or file

    // return this.router.navigate(['']);
  }
}

export class MCAccountValidatorService {
  static username(http: HttpClient) {
    return (control: AbstractControl) => {
      const mcUsername = control.value;
      if (mcUsername === '') {
        return;
      }
      return http
        .get(
          'https://cors-anywhere.herokuapp.com/https://api.mojang.com/users/profiles/minecraft/' +
            mcUsername
        )
        .subscribe(data => {
          if (data != null) {
            return control.setErrors(null);
          } else {
            return control.setErrors({ mcUsernameInvalid: true });
          }
        });
    };
  }
}
