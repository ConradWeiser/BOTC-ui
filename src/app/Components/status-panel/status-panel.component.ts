import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayerElement } from '../player-list/player-list.component';

@Component({
  selector: 'app-status-panel',
  templateUrl: './status-panel.component.html',
  styleUrls: ['./status-panel.component.scss']
})
export class StatusPanelComponent {

  @Input() activePlayers: PlayerElement[] = []
  @Output() activePlayersEmitter = new EventEmitter<PlayerElement[]>()

  update() {
    this.activePlayersEmitter.emit(this.activePlayers)
  }

}
