import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../Services/preloader.service';

@Pipe({
  name: 'outsiderFilter'
})
export class OutsiderFilterPipe implements PipeTransform {

  transform(value: Role[]): Role[] {
    const roles: Role[] = []
    for(let obj of value) {
      if(obj.roleType == 'outsider') {
        roles.push(obj)
      }
    }

    return roles
  }

}
