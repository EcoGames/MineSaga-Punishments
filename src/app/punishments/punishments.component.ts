import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

import { Punishment } from "../services/punishment.model";

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' }

var theDate = new Date().toLocaleDateString('en-us', options);
const PUNISHMENT_DATA: Punishment[] = [
  { punUser: 'first', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
  { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 2, reason: "I'm a reason" },
  { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
  { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 3, reason: "I'm a reason" },
  { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
  { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 2, reason: "I'm a reason" },
  { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
  { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 2, reason: "I'm a reason" },
  { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 3, reason: "I'm a reason" },
  { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
  { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
  { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
  { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
  { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
  { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
  { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
  { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
  { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
  { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
  { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
  { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
  { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
  { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
  { punUser: 'example', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
  { punUser: 'hello', punBy: 'moderator', date: new Date().toLocaleDateString('en-us', options), priorOffenses: 1, reason: "I'm a reason" },
];

@Component({
  selector: 'app-punishments',
  templateUrl: './punishments.component.html',
  styleUrls: ['./punishments.component.scss']
})
export class PunishmentsComponent implements OnInit {
  displayedColumns: string[] = ['punUser', 'punBy', 'date', 'priorOffenses', 'reason'];
  dataSource = new MatTableDataSource(PUNISHMENT_DATA);
  cache: Array<Punishment> = PUNISHMENT_DATA;

  constructor() { }

  ngOnInit() {
    this.clearCache();
  }

  clearCache() {
    setInterval(function() {
      console.log("clearing cache");
      this.cache = {};
    }, 1000 * 60 * 10);
  }


}
