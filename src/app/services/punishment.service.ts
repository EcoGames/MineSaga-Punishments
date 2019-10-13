import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Punishment } from './punishment.model';
import { MCUser } from './mcUser.model';
import {
  AngularFireStorage,
  AngularFireStorageReference
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import * as moment from 'moment';

const corsProxy = 'https://cors-anywhere.herokuapp.com/';

const MOJANG_USER_UUID_URL =
  corsProxy + 'https://api.mojang.com/users/profiles/minecraft/';
const MC_AVATAR_URL = 'https://minotar.net/armor/body/';

@Injectable({
  providedIn: 'root'
})
export class PunishmentService {
  punishmentsRef;
  public myPunishments$: Observable<Array<Punishment>>;
  public punishments: Array<Punishment> = [];

  storageRef: AngularFireStorageReference;
  imagesRef: AngularFireStorageReference;

  constructor(
    public afs: AngularFirestore,
    private http: HttpClient,
    afStorage: AngularFireStorage
  ) {
    this.punishmentsRef = afs.collection('punishments');

    this.storageRef = afStorage.ref('');
    this.imagesRef = this.storageRef.child('evidence');
  }

  public getUserUUID(username: string): Promise<MCUser> {
    return new Promise(resolve => {
      this.http
        .get(MOJANG_USER_UUID_URL + username)
        .subscribe((data: MCUser) => {
          resolve(data);
        });
    });
  }

  public getAllPunishments() {
    return this.afs
      .collection('punishments', ref => ref.orderBy('date', 'desc'))
      .valueChanges();
  }

  public getUserAvatar(UUID): Promise<string> {
    return Promise.resolve(MC_AVATAR_URL + UUID);
  }

  public async addPunishment(
    {
      punUser,
      punBy,
      priorOffenses,
      reason,
      date,
      extraInfo,
      punType
    }: Punishment,
    evidence,
    punUserUID,
    linkEvidence: boolean
  ) {
    // format the current date using momentjs
    let formattedDate = moment(date).format();
    this.punishmentsRef
      .doc(punUserUID)
      .set({
        punUser,
        punBy,
        punType,
        date: formattedDate,
        priorOffenses,
        reason,
        extraInfo
      })
      .then(() => {
        if (!linkEvidence) {
          // if they didn't use links then upload a file
          this.uploadEvidence(evidence, punUserUID + ' ' + formattedDate).then(
            resp => {
              // get download url
              resp.ref.getDownloadURL().then(url => {
                this.punishmentsRef.doc(punUserUID).update({
                  // edit the evidence url of the doc to the provided one
                  evidenceURL: url
                });
              });
            }
          );
        } else {
          // used a link
          let tempdata: string[] = [];
          evidence.forEach(element => {
            tempdata.push(element);
          });
          this.punishmentsRef.doc(punUserUID).update({
            evidenceURL: tempdata
          });
        }
      });
  }

  // deletes punishment based on the firestore document
  public deletePunishment(doc: AngularFirestoreDocument) {
    doc
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  }

  public async uploadEvidence(file, fileName: string): Promise<any> {
    return new Promise(resolve => {
      this.imagesRef
        .child(fileName)
        .put(file.value._files[0])
        .then(snapshot => {
          resolve(snapshot);
        });
    });
  }
}
