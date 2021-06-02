import { Pipe, PipeTransform } from '@angular/core';
import { PlayerElement } from '../Components/player-list/player-list.component';
import { Role } from '../Services/preloader.service';

@Pipe({
  name: 'roleMatch'
})
export class RoleMatchPipe implements PipeTransform {

  transform(value: Role, activePlayers: PlayerElement[]): string {

    // Search for the same name
    const foundRole = activePlayers.find((val) => {return val.playerRole?.id == value.id})
    return foundRole ? "#f2f2f2" : ""
  }

}
