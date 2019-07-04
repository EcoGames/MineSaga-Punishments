// Angular
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';

// Material UI Elements
import { MatToolbarModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, MatMenuModule, MatSidenavModule, MatListModule } from '@angular/material';

// My Components
import { AppComponent } from './app.component';
import { PunishFormComponent } from './punish-form/punish-form.component';
import { AccountComponent } from './account/account.component';
import { PunishmentsComponent } from './punishments/punishments.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

// Environment
import { environment } from "../environments/environment";

// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireAuthGuardModule } from "@angular/fire/auth-guard";

// Services
import { AuthenticationService } from "./services/authentication.service";

@NgModule({
  declarations: [
    AppComponent,
    PunishFormComponent,
    AccountComponent,
    PunishmentsComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule
  ],
  providers: [
    AuthenticationService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
