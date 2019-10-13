import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../guard/auth.guard';

import { PunishmentsComponent } from './punishments.component';
import { PunishmentDetailComponent } from '../punishment-detail/punishment-detail.component';

const punishmentRoutes: Routes = [
  {
    path: 'punishments',
    canActivate: [AuthGuard],
    component: PunishmentsComponent
  },
  {
    path: 'punishment/:id',
    canActivate: [AuthGuard],
    component: PunishmentDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(punishmentRoutes)],
  exports: [RouterModule]
})
export class PunishmentsRoutingModule {}
