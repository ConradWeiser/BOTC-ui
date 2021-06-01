import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators';
import { PlayerElement } from './Components/player-list/player-list.component';
import { HatredRoot, Nightsheet, PreloaderService, Role } from './Services/preloader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  roles: Role[] = []
  nightsheet: Nightsheet = {firstNight: [], otherNight: []}
  hatreds: HatredRoot[] = []

  activeRoles: Role[] = []

  activePlayers: PlayerElement[] = []

  constructor (private preloader: PreloaderService) {}

  ngOnInit(): void {
    this.preloader.preloadData()

    this.preloader.rolesObservable.pipe(map((roles) => {this.roles = roles})).subscribe()
    this.preloader.nightsheetObservable.pipe(map((nightsheet) => {this.nightsheet = nightsheet})).subscribe()
    this.preloader.hatredsObservable.pipe(map((hatreds) => {this.hatreds = hatreds})).subscribe()
  }

  setActiveRoles(roles: Role[]) {
    this.activeRoles = roles
  }

  updateActivePlayers(event: PlayerElement[]) {
    this.activePlayers = event
    this.activePlayers = this.activePlayers.map(x => Object.assign({}, x))
  }
}
