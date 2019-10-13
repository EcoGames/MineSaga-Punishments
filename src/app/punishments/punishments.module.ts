import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from "@angular/material";

import { PunishmentsComponent } from './punishments.component';
import { PunishmentDetailComponent } from '../punishment-detail/punishment-detail.component';

import { PunishmentsRoutingModule } from './punishments-routing.module';

@NgModule({
  declarations: [PunishmentDetailComponent, PunishmentsComponent],
  imports: [CommonModule, PunishmentsRoutingModule, MatTableModule]
})
export class PunishmentsModule {}
