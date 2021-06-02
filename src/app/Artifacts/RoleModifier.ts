import { Role } from "../Services/preloader.service"

export class RoleModifier {

    /**
     * The number of outsiders this role should either add or remove
     */
    public outsiderModifier: number = 0

    public minionModifier: number = 0

    constructor(outsiderModifier: number, minionModifier: number) {
        this.outsiderModifier = outsiderModifier
    }

    public static buildRoleModifier(role: Role): RoleModifier {
        // Well, fuck. The role text isn't valid through the API, just a print. I CBA to set up a image to text system, so we'll hardcode shit
        switch(role.name) {
            case "Balloonist": return new RoleModifier(1, 0)
            case "Baron": return new RoleModifier(2, 0)
            case "Godfather": {
                // This can be either -1 or +1, randomize it. Pin it between 1 and 2.
                const rand = Math.floor(Math.random() * (2 - 1 + 1)) + 1
                if(rand == 1) {
                    return new RoleModifier(-1, 0)
                }
                else {
                    return new RoleModifier(1, 0)
                }
            }
            case "Fang Gu": return new RoleModifier(1, 0)
            case "Lil' Monsta": return new RoleModifier(0, 1)
            case "Vigormortis": return new RoleModifier(-1, 0)
            default: return new RoleModifier(0, 0)
        }
    }
}