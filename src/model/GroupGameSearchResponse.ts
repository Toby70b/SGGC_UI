import {ApiError} from "./ApiError";
import {Application} from "./Application";

export interface GroupGameSearchResponse {
    success: boolean[];
    body : ApiError| Application[];
}


