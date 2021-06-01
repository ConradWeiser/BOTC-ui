import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../Services/preloader.service';

@Pipe({
  name: 'demonFilter'
})
export class DemonFilterPipe implements PipeTransform {

  transform(value: Role[]): Role[] {
    const roles: Role[] = []
    for(let obj of value) {
      if(obj.roleType == 'demon') {
        roles.push(obj)
      }
    }

    return roles
  }

}
