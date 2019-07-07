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

const theDate = Date.now();
/* const PUNISHMENT_DATA: Punishment[] = [
  {
    punUser: 'first',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 1,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'example',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 2,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'example',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 1,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'example',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 3,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'example',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 1,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'example',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 2,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'example',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 1,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'example',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 2,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'example',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 3,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'example',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 1,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'example',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 1,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'example',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 1,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'example',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 1,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'example',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 1,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'example',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 1,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'example',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 1,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'example',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 1,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'example',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 1,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'example',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 1,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'example',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 1,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'example',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 1,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'example',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 1,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'example',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 1,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'example',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 1,
    reason: 'I\'m a reason'
  },
  {
    punUser: 'hello',
    punBy: 'moderator',
    date: Date.now(),
    priorOffenses: 1,
    reason: 'I\'m a reason'
  }
]; */

@Component({
  selector: 'app-punishments',
  templateUrl: './punishments.component.html',
  styleUrls: ['./punishments.component.scss']
})
export class PunishmentsComponent implements OnInit {
  displayedColumns: string[] = [
    'punUser',
    'punBy',
    'date',
    'priorOffenses',
    'reason',
    'evidence'
  ];
  dataSource;

  constructor(public punService: PunishmentService) {}

  async ngOnInit() {
    this.dataSource = this.punService.getAllPunishments();
  }
}
