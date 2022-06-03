
export default class ValidationResult {

    private error: boolean;
    private objectId: string;
    private errorMessage: string;

    constructor(error: boolean, objectId?: string, errorMessage?: string) {
        this.error = error;
        this.objectId = objectId ?? "";
        this.errorMessage = errorMessage ?? "";
    }


    get isError(): boolean {
        return this.error;
    }

    set setError(value: boolean) {
        this.error = value;
    }

    get getObjectId(): string {
        return this.objectId;
    }

    set setObjectId(value: string) {
        this.objectId = value;
    }

    get getErrorMessage(): string {
        return this.errorMessage;
    }

    set setErrorMessage(value: string) {
        this.errorMessage = value;
    }
}




