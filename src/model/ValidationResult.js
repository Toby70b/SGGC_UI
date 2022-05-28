export class ValidationResult {
    constructor(error,objectId,errorMessage) {
        this._error = error;
        this._objectId = objectId;
        this._errorMessage = errorMessage;
    }

    get error() {
        return this._error;
    }

    set error(value) {
        this._error = value;
    }

    get objectId() {
        return this._objectId;
    }

    set objectId(value) {
        this._objectId = value;
    }

    get errorMessage() {
        return this._errorMessage;
    }

    set errorMessage(value) {
        this._errorMessage = value;
    }
}

