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

    const rand = Math.floor(Math.random() * 50)

    this.activePlayers.push({
      playerName: "",
      playerIndex: this.activePlayers.length,
      playerRole: this.availableRoles[rand]
    })
  }

  update() {
    this.activePlayersEmitter.emit(this.activePlayers)
    console.log(this.activePlayers)
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
}

export interface PlayerElement {
  playerName: string,
  playerIndex: number,
  playerRole?: Role
  //TODO: Consider adding a player status here
}
