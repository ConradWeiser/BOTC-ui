import { Pipe, PipeTransform } from '@angular/core';
import { PlayerElement } from '../Components/player-list/player-list.component';
import { Nightsheet } from '../Services/preloader.service';

@Pipe({
  name: 'otherNights'
})
export class OtherNightsPipe implements PipeTransform {

  transform(activePlayers: PlayerElement[], nightsheet: Nightsheet): PlayerElement[] {

    console.log(activePlayers)
    console.log(nightsheet)
    
    // For everything in the first night, get just the relevent active players and sort them
    const response: PlayerElement[] = []
    for(let obj of nightsheet.otherNight) {
      const releventPlayer = activePlayers.find((player) => {
        if(player.playerRole) {
          return player.playerRole.name.toLowerCase() == obj.toLowerCase()
        }
        return false
      })

      if(releventPlayer) {response.push(releventPlayer)}
    }

    return response

  }

}
