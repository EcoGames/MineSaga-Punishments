import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from "./account/account.component";
import { PunishFormComponent } from "./punish-form/punish-form.component";
import { PunishmentsComponent } from "./punishments/punishments.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: PunishmentsComponent, data: { title: 'Punishments | MineSaga Punish' } },
  { path: 'account', component: AccountComponent, data: { title: 'Account | MineSaga Punish' }  },
  { path: 'new-punishment', component: PunishFormComponent, data: { title: 'New Punishment | MineSaga Punish' }  },
  { path: 'login', component: LoginComponent, data: { title: 'Login | MineSaga Punish' }  },
  { path: 'signup', component: SignupComponent, data: { title: 'Sign up | MineSaga Punish' }   },
  { path: "**", redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
