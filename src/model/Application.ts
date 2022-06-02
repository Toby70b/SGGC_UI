export default class Application {
    private name: string;
    private appid: string;

    constructor(name: string, appid: string) {
        this.name = name;
        this.appid = appid;
    }

    get getName(): string {
        return this.name;
    }

    set setName(value: string) {
        this.name = value;
    }

    get getAppid(): string {
        return this.appid;
    }

    set setAppid(value: string) {
        this.appid = value;
    }
}
