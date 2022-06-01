export default class GroupGameSearchRequest {
    private steamIds: string[];
    private multiplayerOnly : boolean;

    constructor(steamIds: string[], multiplayerOnly: boolean) {
        this.steamIds = steamIds;
        this.multiplayerOnly = multiplayerOnly;
    }


    get getSteamIds(): string[] {
        return this.steamIds;
    }

    set setSteamIds(value: string[]) {
        this.steamIds = value;
    }

    get getMultiplayerOnly(): boolean {
        return this.multiplayerOnly;
    }

    set setMultiplayerOnly(value: boolean) {
        this.multiplayerOnly = value;
    }
}
