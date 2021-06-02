import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Nightsheet } from 'src/app/Services/preloader.service';
import { PlayerElement } from '../player-list/player-list.component';

@Component({
  selector: 'app-night-order',
  templateUrl: './night-order.component.html',
  styleUrls: ['./night-order.component.scss']
})
export class NightOrderComponent implements OnChanges {

  @Input() activePlayers: PlayerElement[] = []
  @Input() gameNightsheet: Nightsheet = {firstNight: [], otherNight: []}

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.activePlayers) {
      this.activePlayers = changes.activePlayers.currentValue
    }
  }

}
