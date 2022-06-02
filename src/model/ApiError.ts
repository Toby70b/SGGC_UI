export default class ApiError{
    private readonly exception : string;
    private readonly errorMessage : string;
    private readonly errorDetails : any;

    constructor(exception: string, errorMessage: string, errorDetails?: any) {
        this.exception = exception;
        this.errorMessage = errorMessage;
        this.errorDetails = errorDetails;
    }
    
    get getException(): string {
        return this.exception;
    }

    get getErrorMessage(): string {
        return this.errorMessage;
    }

    get getErrorDetails(): any {
        return this.errorDetails;
    }
}
