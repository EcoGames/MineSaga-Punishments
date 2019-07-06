import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Punishment } from './punishment.model';
import { MCUser } from './mcUser.model';
import {
  AngularFireStorage,
  AngularFireStorageReference
} from '@angular/fire/storage';

const corsProxy = 'https://cors-anywhere.herokuapp.com/';

const MOJANG_USER_UUID_URL =
  corsProxy + 'https://api.mojang.com/users/profiles/minecraft/';
const MC_AVATAR_URL = 'https://minotar.net/body/';

@Injectable({
  providedIn: 'root'
})
export class PunishmentService {
  storageRef: AngularFireStorageReference;
  imagesRef: AngularFireStorageReference;

  constructor(
    public afs: AngularFirestore,
    private http: HttpClient,
    afStorage: AngularFireStorage
  ) {
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

  public getUserAvatar(UUID): Promise<string> {
    return Promise.resolve(MC_AVATAR_URL + UUID);
  }

  public async addPunishment(
    { punUser, punBy, date, priorOffenses, reason }: Punishment,
    file
  ) {
    const punishCollRef: AngularFirestoreCollection = this.afs.collection(
      'punishments'
    );

    punishCollRef
      .add({
        punUser,
        punBy,
        date,
        priorOffenses,
        reason
      })
      .then(doc => {
        this.uploadEvidence(file, doc.id);
      });
  }

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

  public async uploadEvidence(file, fileName): Promise<string> {
    return new Promise(resolve => {
      this.imagesRef
        .child(fileName)
        .put(file.value.files[0])
        .then(snapshot => {
          console.log(snapshot);
          resolve(snapshot);
        });
    });
  }
}
