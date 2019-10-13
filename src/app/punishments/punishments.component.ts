import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { PunishmentService } from '../services/punishment.service';
import { Punishment } from '../services/punishment.model';
import { DocumentData } from '@angular/fire/firestore';

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour12: false,
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};


@Component({
  selector: 'app-punishments',
  templateUrl: './punishments.component.html',
  styleUrls: ['./punishments.component.scss']
})
export class PunishmentsComponent implements OnInit {
  displayedColumns: string[] = [
    'punUser',
    'punBy',
    'punType',
    'date',
    'priorOffenses',
    'reason',
    'evidenceURL',
    'extraInfo'
  ];
  dataSource;

  constructor(public punService: PunishmentService) {}

  async ngOnInit() {
    this.dataSource = this.punService.getAllPunishments();
  }
}
