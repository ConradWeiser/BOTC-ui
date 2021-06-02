import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Role } from 'src/app/Services/preloader.service';
import { PlayerElement } from '../player-list/player-list.component';

@Component({
  selector: 'app-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss']
})
export class SetupPageComponent {

  @Input() availableRoles: Role[] = []
  @Input() activeRoles: Role[] = []
  @Input() activePlayers: PlayerElement[] = []
  @Output() activeRolesEmitter = new EventEmitter<Role[]>()
  @Output() activePlayersEmitter = new EventEmitter<PlayerElement[]>()

  townRoles: Role[] = []
  outsiderRoles: Role[] = []
  minionRoles: Role[] = []
  demonRoles: Role[] = []

  ratioTown: number = 0
  ratioOutsider: number = 0
  ratioMinion: number = 0
  ratioDemon: number = 0

  addPlayer() {
    this.activePlayers.push({
      playerName: "",
      playerIndex: this.activePlayers.length,
      isDead: false,
      isDrunk: false,
      isProtected: false,
      isPoisoned: false,
      dailyNotes: [[]]
    })
  }

  removePlayer(player: PlayerElement) {
    const index = this.activePlayers.indexOf(player, 0)
    if(index > -1) {
      this.activePlayers.splice(index, 1)

      // reindex the current players
      let count = 0
      for(let obj of this.activePlayers) {
        obj.playerIndex = count
        count++
      }

      this.update()
    }
  }

  randomize() {
    const playerCount = this.ratioTown + this.ratioDemon + this.ratioOutsider + this.ratioMinion
    if(playerCount < this.activePlayers.length) {
      alert("You have too many slots for this ratio")
      return
    }
    else if(playerCount > this.activePlayers.length) {
      console.log(`${playerCount} vs ${this.activePlayers.length}`)
      const startingPlayerCount = this.activePlayers.length
      for(let i = 0; i < playerCount - startingPlayerCount; i++) {
        this.addPlayer()
      }
    }

    // Randomly sample our role pool
    let townPool = this.deepCopyRoleArray(this.townRoles)
    let outsiderPool = this.deepCopyRoleArray(this.outsiderRoles)
    let minionPool = this.deepCopyRoleArray(this.minionRoles)
    let demonPool = this.deepCopyRoleArray(this.demonRoles)

    townPool.sort((a, b) => {return Math.random() - 0.5})
    outsiderPool.sort((a, b) => {return Math.random() - 0.5})
    minionPool.sort((a, b) => {return Math.random() - 0.5})
    demonPool.sort((a, b) => {return Math.random() - 0.5})


    // If we're requesting more count than we have available, complain
    if(townPool.length < this.ratioTown || outsiderPool.length < this.ratioOutsider || minionPool.length < this.ratioMinion || demonPool.length < this.ratioDemon) {
      alert("One of your ratios has more requested than the script has available. nice")
      return
    }

    // Scramble the players
    let players = this.deepCopyPlayerList(this.activePlayers)
    players.sort((a, b) => {return Math.random() - 0.5})

    // Iteratively apply each role to a player
    let playerIndex = 0
    for(let i = 0; i < this.ratioTown; i++) {
      players[playerIndex].playerRole = townPool[0]
      townPool.splice(0, 1)
      playerIndex++
    }

    for(let i = 0; i < this.ratioOutsider; i++) {
      players[playerIndex].playerRole = outsiderPool[0]
      outsiderPool.splice(0, 1)
      playerIndex++
    }

    for(let i = 0; i < this.ratioMinion; i++) {
      players[playerIndex].playerRole = minionPool[0]
      minionPool.splice(0, 1)
      playerIndex++
    }

    for(let i = 0; i < this.ratioDemon; i++) {
      players[playerIndex].playerRole = demonPool[0]
      demonPool.splice(0, 1)
      playerIndex++
    }

    // Handle the role modifiers where roles are added or removed
    let minionMod = 0
    let outsiderMod = 0
    for(let obj of players) {
      if(obj.playerRole?.modifier) {
        minionMod += obj.playerRole.modifier.minionModifier
        outsiderMod += obj.playerRole.modifier.outsiderModifier
      }
    }

    while(minionMod > 0) {
      // Replace the first townsperson with an unused minion
      const firstTownsperson = players.find((player) => {return player.playerRole!.roleType = "townsfolk"})

      if(!firstTownsperson) {
        alert("Something fucky happened. Do you not have any town roles?")
        return
      }

      firstTownsperson.playerRole = minionPool[0]
      minionPool.splice(0, 1)
      minionMod--
    }

    while(outsiderMod > 0) {
      // Replace the first townsperson with an unused outsider
      const firstTownsperson = players.find((player) => {return player.playerRole!.roleType == "townsfolk"})
      if(!firstTownsperson) {
        alert("Something fucky happened. Do you not have any town roles?")
        return
      }

      firstTownsperson.playerRole = outsiderPool[0]
      outsiderPool.splice(0, 1)

      outsiderMod--
    }

    while(outsiderMod < 0) {
      // Replace the first outsider with an unused town
      const firstOutsider = players.find((player) => {return player.playerRole!.roleType == "outsider"})
      if(!firstOutsider) {
        alert("Something fucky happened. Do you not have enough outsider roles?")
        return
      }

      firstOutsider.playerRole = townPool[0]
      townPool.splice(0, 1)
      outsiderMod++
    }

    while(minionMod < 0) {
      // Replace the first minion with an unused town
      const firstOutsider = players.find((player) => {return player.playerRole!.roleType == "townsfolk"})
      if(!firstOutsider) {
        alert("Something fucky happened. Do you not have enough outsider roles?")
        return
      }

      firstOutsider.playerRole = townPool[0]
      townPool.splice(0, 1)
      minionMod++
    }

    // Sort the players and assign it back to the list
    players.sort((a, b) => a.playerIndex - b.playerIndex)
    this.activePlayers = players

    console.log(this.activePlayers)

    this.update()
  }

  update() {
    this.activePlayersEmitter.emit(this.activePlayers)
    this.activeRolesEmitter.emit(this.activeRoles)
  }

  loadScript(event: any) {
    const file = event.target.files[0]
    const fileReader = new FileReader()

    fileReader.onload = ((event) => {
      if(event.target == null) {
        return
      }

      let scriptText = event.target.result?.toString()

      if(!scriptText) {
        return
      }

      this.activeRoles = []

      // Translate these script roles into role representations
      for(let obj of JSON.parse(scriptText)) {
        const id = String(obj.id).toLowerCase().replace(/_/g, " ")
        const matchingRole = this.availableRoles.find((val) => {
          return val.name.toLowerCase() == id
        })

        if(!matchingRole) {
          console.log("SOMETHING WENT FUCKY WITH SCRIPT IMPORTING")
          return
        }
        this.activeRoles.push(matchingRole)

        // Sort this element into it's respective category role as well
        switch(matchingRole.roleType) {
          case "townsfolk": this.townRoles.push(matchingRole); break;
          case "outsider": this.outsiderRoles.push(matchingRole); break;
          case "minion": this.minionRoles.push(matchingRole); break;
          case "demon": this.demonRoles.push(matchingRole); break;
        }
      }

      this.activeRolesEmitter.emit(this.activeRoles)
    })

    fileReader.readAsText(file, 'UTF-8')
  }

  private deepCopyRoleArray(obj: Role[]): Role[] {
    return JSON.parse(JSON.stringify(obj))
  }

  private deepCopyPlayerList(obj: PlayerElement[]): PlayerElement[] {
    return JSON.parse(JSON.stringify(obj))
  }

}
