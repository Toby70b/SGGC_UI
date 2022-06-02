import Application from "./Application";

//TODO should we use any for the body? It will either be an error or a list of applications
export default class GroupGameSearchResponse {
    private readonly success: boolean[];
    private readonly body : any;

    constructor(success: boolean[], body: any) {
        this.success = success;
        this.body = body;
    }

    get getSuccess(): boolean[] {
        return this.success;
    }

    get getBody(): any {
        return this.body;
    }
}


