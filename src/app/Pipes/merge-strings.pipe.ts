import { Pipe, PipeTransform } from '@angular/core';
import { PlayerElement } from '../Components/player-list/player-list.component';

@Pipe({
  name: 'mergeStrings'
})
export class MergeStringsPipe implements PipeTransform {

  transform(value: PlayerElement, index: number): string {
    return value.dailyNotes[index]?.join(' | ')
  }

}
