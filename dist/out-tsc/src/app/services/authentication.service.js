import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, } from '@angular/fire/firestore';
let AuthenticationService = class AuthenticationService {
    constructor(afAuth, router, afs) {
        this.afAuth = afAuth;
        this.router = router;
        this.afs = afs;
        this.loggedIn = false;
        this.loggedIn = !!sessionStorage.getItem('user');
    }
    // Sign in with Google
    googleSignin() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const provider = new auth.GoogleAuthProvider();
            const credential = yield this.afAuth.auth.signInWithPopup(provider);
            sessionStorage.setItem('user', JSON.stringify(credential.user.toJSON()));
            this.loggedIn = true;
            yield this.updateUserData(credential.user);
            return this.router.navigate(['']);
        });
    }
    // Firebase auth sign in, email and password
    login(email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var result = yield this.afAuth.auth.signInWithEmailAndPassword(email, password);
            yield sessionStorage.setItem('user', JSON.stringify(result.user.toJSON()));
            this.loggedIn = true;
            yield this.updateUserData(result.user);
            return this.router.navigate(['']);
        });
    }
    // Firebase auth sign up, email and password
    signUp(email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                this.sendEmailVerification();
                yield sessionStorage.setItem('user', JSON.stringify(result.user.toJSON()));
                this.loggedIn = true;
                yield this.updateUserData(result.user);
                return this.router.navigate(['']);
            })).catch((error) => {
                window.alert(error.message); // TODO: remove this and find a better way
            });
        });
    }
    // TODO: implement anon authentication
    // Sending email verification
    sendEmailVerification() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
                this.router.navigate(['']); /* Add some parameters to make sure they know it was sent */
            }).catch((error) => {
                console.log(error); /* Make a better way */
            });
        });
    }
    // Sending a password reset email
    sendPasswordResetEmail(passwordResetEmail) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail).then(() => {
                /* Navagate them back to home with params */
            }).catch((error) => {
                console.log(error); /* Make a better way */
            });
        });
    }
    // Sigout
    logout() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.afAuth.auth.signOut();
            sessionStorage.removeItem('user');
            this.loggedIn = false;
            return this.router.navigate(['/login']);
        });
    }
    // Get value of logged in boolean
    get isLoggedIn() {
        return this.loggedIn;
    }
    updateUserData({ uid, email, displayName, photoURL }) {
        const userRef = this.afs.doc(`users/${uid}`);
        const data = {
            uid,
            email,
            displayName,
            photoURL
        };
        return userRef.set(data, { merge: true });
    }
};
AuthenticationService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [AngularFireAuth, Router, AngularFirestore])
], AuthenticationService);
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map