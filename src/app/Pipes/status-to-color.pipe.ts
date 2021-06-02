import { Pipe, PipeTransform } from '@angular/core';
import { PlayerElement, Status } from '../Components/player-list/player-list.component';

@Pipe({
  name: 'statusToColor'
})
export class StatusToColorPipe implements PipeTransform {

  transform(value: PlayerElement): string {

    if(value.isDead) {
      return '#ffe6e6'
    }

    if(value.isProtected) {
      return '#e6f5ff'
    }

    if(value.isPoisoned) {
      return '#f2ffe6'
    }

    if(value.isDrunk) {
      return '#ffe6ff'
    }

    return '#f2f2f2'
  }

}
