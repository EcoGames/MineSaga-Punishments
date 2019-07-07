import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { User } from './user';
import { isUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public loggedIn = false;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore
  ) {
    this.loggedIn = !!sessionStorage.getItem('user');
  }

  // Sign in with Google
  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    sessionStorage.setItem('user', JSON.stringify(credential.user.toJSON()));
    this.loggedIn = true;
    this.updateUserData(credential.user);
    return this.router.navigate(['']);
  }

  // Firebase auth sign in, email and password
  async login(email: string, password: string) {
    const result = await this.afAuth.auth.signInWithEmailAndPassword(
      email,
      password
    );
    sessionStorage.setItem('user', JSON.stringify(result.user.toJSON()));
    this.loggedIn = true;
    this.updateUserData(result.user);
    return this.router.navigate(['']);
  }

  // Firebase auth sign up, email and password
  signUp(email: string, password: string, username: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(async result => {
        this.sendEmailVerification();
        sessionStorage.setItem('user', JSON.stringify(result.user.toJSON()));
        this.loggedIn = true;
        result.user
          .updateProfile({
            displayName: username
          })
          .then(() => {
            this.updateUserData(result.user);
            return this.router.navigate(['']);
          });
      })
      .catch(error => {
        window.alert(error.message); // TODO: remove this and find a better way
      });
  }

  // Sending email verification
  async sendEmailVerification() {
    this.afAuth.auth.currentUser
      .sendEmailVerification()
      .then(() => {
        this.router.navigate([
          ''
        ]); /* Add some parameters to make sure they know it was sent */
      })
      .catch(error => {
        console.log(error); /* Make a better way */
      });
  }

  // Sending a password reset email
  async sendPasswordResetEmail(passwordResetEmail: string) {
    await this.afAuth.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        /* Navagate them back to home with params */
      })
      .catch(error => {
        console.log(error); /* Make a better way */
      });
  }

  // Sigout
  public async logout() {
    this.afAuth.auth.signOut();
    sessionStorage.removeItem('user');
    this.loggedIn = false;
    return this.router.navigate(['/login']);
  }

  // Get value of logged in boolean
  public get isLoggedIn() {
    return this.loggedIn;
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    if (isUndefined(user.displayName)) {
      user.displayName = '';
    }

    const data: User = {
      uid: user.uid,
      email: user.email,
      username: user.displayName,
      roles: {
        helper: true
      }
    };

    return userRef.set(data, { merge: true });
  }
}
