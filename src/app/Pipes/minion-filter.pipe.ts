import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../Services/preloader.service';

@Pipe({
  name: 'minionFilter'
})
export class MinionFilterPipe implements PipeTransform {

  transform(value: Role[]): Role[] {
    const roles: Role[] = []
    for(let obj of value) {
      if(obj.roleType == 'minion') {
        roles.push(obj)
      }
    }

    return roles
  }

}
