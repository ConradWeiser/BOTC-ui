import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlayerElement } from '../player-list/player-list.component';

@Component({
  selector: 'app-notes-panel',
  templateUrl: './notes-panel.component.html',
  styleUrls: ['./notes-panel.component.scss']
})
export class NotesPanelComponent {

  @Input() activePlayers: PlayerElement[] = []
  @Output() activePlayersEmitter = new EventEmitter<PlayerElement[]>()
  @Output() currentDayEmitter = new EventEmitter<Number>()

  selected = new FormControl(0)

  tabs: string[] = ['Day 0']

  setDay(event: any) {
    this.selected.setValue(event)
    this.currentDayEmitter.emit(this.selected.value)
  }

  addTab() {
    this.tabs.push('New')
  }

}

export interface TabData {
  tabName: string
}
