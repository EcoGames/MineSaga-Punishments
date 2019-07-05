import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// My components
import { AccountComponent } from './account/account.component';
import { PunishFormComponent } from './punish-form/punish-form.component';
import { PunishmentsComponent } from './punishments/punishments.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

// Guards
import { AuthGuard } from './guard/auth.guard';
import { SecureInnerPagesGuard } from './guard/secure-inner-pages.guard';

const routes: Routes = [
  { path: '', component: PunishmentsComponent, data: { title: 'Punishments | MineSaga Punish' } },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard], data: { title: 'Account | MineSaga Punish' } },
  { path: 'new-punishment', component: PunishFormComponent, canActivate: [AuthGuard], data: { title: 'New Punishment | MineSaga Punish' } },
  { path: 'login', component: LoginComponent, canActivate: [SecureInnerPagesGuard], data: { title: 'Login | MineSaga Punish' } },
  { path: 'signup', component: SignupComponent, canActivate: [SecureInnerPagesGuard], data: { title: 'Sign up | MineSaga Punish' } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
