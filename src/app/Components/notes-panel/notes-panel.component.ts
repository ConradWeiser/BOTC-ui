import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayerElement } from '../player-list/player-list.component';

@Component({
  selector: 'app-notes-panel',
  templateUrl: './notes-panel.component.html',
  styleUrls: ['./notes-panel.component.scss']
})
export class NotesPanelComponent {

  @Input() activePlayers: PlayerElement[] = []
  @Output() activePlayersEmitter = new EventEmitter<PlayerElement[]>()

  activeTabs: TabData[] = []

  update() {
    this.activePlayersEmitter.emit(this.activePlayers)
    console.log("Updated")
  }

  addDay() {
    this.activeTabs.push({tabName: `${this.activeTabs.length}`})
  }

}

export interface TabData {
  tabName: string
}
