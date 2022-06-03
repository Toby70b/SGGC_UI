const handleResponse = (response: Response): Response => {
    if (!response.ok) {
        throw response;
    }
    return response;
}

export const fetchFromApi = (url: string, options: RequestInit, onSuccess: (response: any) => void, onError: (response: any) => void): Promise<void> => {
    return fetch(url, options)
        .then(handleResponse)
        .then((response) => response.json())
        .then((jsonResponse: unknown) => onSuccess(jsonResponse))
        .catch(err => {
            if (err.json) {
                err.json().then((errorJson: unknown) => {
                    onError(errorJson)
                })
            }
        })
}

export const returnPostOptions = (data: unknown): RequestInit => {
    return returnCommonOptions(data, 'POST');
}

const returnCommonOptions = (data: unknown, method: string): RequestInit => {
    return {
        method: method,
        headers: {'Content-Type': 'application/json;'},
        body: JSON.stringify(data),
    };
}

