import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

import { User } from './user.model';
import { loggedIn } from '@angular/fire/auth-guard';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public loggedIn: boolean = false;

  constructor(public afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) {
    this.loggedIn = !!sessionStorage.getItem('user');
  }

  // Sign in with Google
  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    sessionStorage.setItem('user', JSON.stringify(credential.user.toJSON()));
    this.loggedIn = true;
    await this.updateUserData(credential.user);
    return this.router.navigate([''])
  }

  // Firebase auth sign in, email and password
  async login(email: string, password: string) {
    var result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    await sessionStorage.setItem('user', JSON.stringify(result.user.toJSON()));
    this.loggedIn = true;
    await this.updateUserData(result.user);
    return this.router.navigate(['']);
  }

  // Firebase auth sign up, email and password
  async signUp(email: string, password: string) {
    return await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(async result => {
      this.sendEmailVerification();
      await sessionStorage.setItem('user', JSON.stringify(result.user.toJSON()));
      this.loggedIn = true;
      await this.updateUserData(result.user);
      return this.router.navigate(['']);
    }).catch((error) => {
      window.alert(error.message); // TODO: remove this and find a better way
    })
  }

  // TODO: implement anon authentication

  // Sending email verification
  async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.router.navigate(['']); /* Add some parameters to make sure they know it was sent */
    }).catch((error) => {
      console.log(error); /* Make a better way */
    })
  }

  // Sending a password reset email
  async sendPasswordResetEmail(passwordResetEmail: string) {
    await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail).then(() => {
      /* Navagate them back to home with params */
    }).catch((error) => {
      console.log(error); /* Make a better way */
    })
  }

  // Sigout
  public async logout() {
    await this.afAuth.auth.signOut();
    sessionStorage.removeItem('user');
    this.loggedIn = false;
    return this.router.navigate(['/login']);
  }

  // Get value of logged in boolean
  public get isLoggedIn() {
    return this.loggedIn;
  }

  private updateUserData({ uid, email, displayName, photoURL }: User) {

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName,
      photoURL
    }

    return userRef.set(data, { merge: true });

  }

}
