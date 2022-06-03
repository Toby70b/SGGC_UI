import {fetchFromApi, returnPostOptions} from "./index";
import GroupGameSearchRequest from "../model/GroupGameSearchRequest";

export const getCommonGamesBetweenUsers= (requestObj: GroupGameSearchRequest,onSuccess : (response : any) => void,onError : (response : any) => void ) : Promise<void> =>{
    return fetchFromApi(process.env.REACT_APP_SGGC_URL as string, returnPostOptions(requestObj), onSuccess, onError);
}
