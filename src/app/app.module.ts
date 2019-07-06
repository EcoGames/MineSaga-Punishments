// Angular
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// Material UI Elements
import {
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatTableModule,
  MatCardModule,
  MatExpansionModule,
  MatGridListModule
} from '@angular/material';
import { MaterialFileInputModule } from 'ngx-material-file-input';

// My Components
import { AppComponent } from './app.component';
import { PunishFormComponent } from './punish-form/punish-form.component';
import { AccountComponent } from './account/account.component';
import { PunishmentsComponent } from './punishments/punishments.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

// Environment
import { environment } from '../environments/environment';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Services
import { AuthenticationService } from './services/authentication.service';
import { LayoutModule } from '@angular/cdk/layout';

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
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatExpansionModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    MaterialFileInputModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFireStorageModule
  ],
  providers: [AuthenticationService, Title],
  bootstrap: [AppComponent]
})
export class AppModule {}
