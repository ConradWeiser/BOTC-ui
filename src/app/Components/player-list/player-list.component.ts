import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Role } from 'src/app/Services/preloader.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent {

  @Input() availableRoles: Role[] = []

  @Input() activePlayers: PlayerElement[] = []
  @Output() activePlayersEmitter = new EventEmitter<PlayerElement[]>()

  constructor() { }

  addPlayer() {

    this.activePlayers.push({
      playerName: "",
      playerIndex: this.activePlayers.length,
      playerRole: undefined,
      isDead: false,
      isDrunk: false
    })
  }

  update() {
    this.activePlayersEmitter.emit(this.activePlayers)
  }

  deletePlayer(player: PlayerElement) {
    const index = this.activePlayers.indexOf(player, 0)
    if(index > -1) {
      this.activePlayers.splice(index, 1)
      this.activePlayersEmitter.emit(this.activePlayers)
    }
  }

  test() {
    console.log(this.activePlayers)
  }

  onSelection(event: any, player: PlayerElement) {
    // Get the role with the given name
    const role = this.availableRoles.find((role) => {return role.name == event})
    player.playerRole = role
    this.update()
  }
}

export interface PlayerElement {
  playerName: string,
  playerIndex: number,
  playerRole?: Role
  isDead: boolean
  isDrunk: boolean
}

export enum Status {
  NORMAL,
  POISONED,
  DEAD
}
