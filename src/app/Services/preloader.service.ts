import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {

  constructor(private http: HttpClient) { }

  public rolesObservable: BehaviorSubject<Role[]> = new BehaviorSubject<Role[]>([])
  public hatredsObservable: BehaviorSubject<HatredRoot[]> = new BehaviorSubject<HatredRoot[]>([])
  public nightsheetObservable: BehaviorSubject<Nightsheet> = new BehaviorSubject<Nightsheet>({firstNight: [], otherNight: []})

  public preloadData() {
    this.loadJSON().subscribe(responseList => {
      const roleData = responseList[0] as Role[]
      const hatredData = responseList[1]
      const nightsheetData = responseList[2]

      //postprocess the role data and inject the correct image URLs for each of them
      let roleDataModified: Role[] = []
      for(let obj of roleData) {
        roleDataModified.push({
          id: obj.id,
          isDisabled: obj.isDisabled,
          name: obj.name,
          version: obj.version,
          roleType: obj.roleType,
          icon: `http://cors.stormcloud.host/https://bloodontheclocktower.com/script${obj.icon.substr(1, obj.icon.length)}`,
          print: `http://cors.stormcloud.host/https://bloodontheclocktower.com/script${obj.print.substr(1, obj.print.length)}`
        })
      }
      
      // Sort the role data alphabetically
      roleDataModified = roleDataModified.sort((a: Role, b: Role) => {return a.name > b.name ? 1 : -1})

      this.rolesObservable.next(roleDataModified)
      this.hatredsObservable.next(hatredData)
      this.nightsheetObservable.next(nightsheetData)
    })
  }

  private loadJSON(): Observable<any[]> {
    const roleURL = 'http://cors.stormcloud.host/https://bloodontheclocktower.com/script/data/roles.json'
    const hatredURL = `http://cors.stormcloud.host/https://bloodontheclocktower.com/script/data/hatred.json`
    const nightsheetURL = `http://cors.stormcloud.host/https://bloodontheclocktower.com/script/data/nightsheet.json`

    let roles = this.http.get<Role[]>(roleURL)
    let hatreds = this.http.get<HatredRoot[]>(hatredURL)
    let nightsheet = this.http.get<Nightsheet>(nightsheetURL)

    return forkJoin([roles, hatreds, nightsheet])
  }
}


// Data structures pulled from the web
export interface Role {
  icon: string,
  id: string,
  isDisabled: boolean,
  name: string,
  print: string,
  roleType: string,
  version: string
}

export interface HatredRoot {
  id: string,
  hatred: Hatred[]
}

export interface Hatred {
  id: string,
  reason: string
}

export interface Nightsheet {
  firstNight: string[],
  otherNight: string[]
}
