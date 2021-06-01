import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../Services/preloader.service';

@Pipe({
  name: 'townspersonFilter'
})
export class TownspersonFilterPipe implements PipeTransform {

  transform(value: Role[]): Role[] {
    const roles: Role[] = []
    for(let obj of value) {
      if(obj.roleType == 'townsfolk') {
        roles.push(obj)
      }
    }

    return roles
  }

}
