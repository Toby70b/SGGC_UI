export interface ApiError {
    readonly exception: string;
    readonly errorMessage: string;
    readonly errorDetails: unknown;
}
