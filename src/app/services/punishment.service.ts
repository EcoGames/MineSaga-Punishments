import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Punishment } from './punishment.model';
import { Observable } from 'rxjs';

import { MCUser } from './mcUser.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

const corsProxy = 'https://cors-anywhere.herokuapp.com/';

const MOJANG_USER_UUID_URL = corsProxy + 'https://api.mojang.com/users/profiles/minecraft/';
const MC_AVATAR_URL = 'https://minotar.net/body/';

@Injectable({
  providedIn: 'root'
})
export class PunishmentService {

  mcAccountValid: boolean;

  private punishCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore, private http: HttpClient) {
    this.punishCollection = afs.collection('punishments');
  }

  public getUserUUID(username: string, callback): any {
    this.http.get(MOJANG_USER_UUID_URL + username).subscribe((data: MCUser) => {
      if (!data) {
        callback(null);
        return;
      }
      callback(data);
    });

  }

  public getUserAvatar(UUID): string {
    return MC_AVATAR_URL + UUID;
  }

  public addPunishment({ punUser, punBy, date, priorOffenses, reason }: Punishment) {
    this.punishCollection.add({
      punUser,
      punBy,
      date,
      priorOffenses,
      reason
    });
  }

  public deletePunishment(doc: AngularFirestoreDocument) {
    doc.delete().then(() => {
      console.log('Document successfully deleted!');
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
  }

}
