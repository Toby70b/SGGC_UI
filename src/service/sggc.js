import {fetchFromApi, returnPostOptions} from "./index";

export const getCommonGamesBetweenUsers= (requestObj,onSuccess,onError) =>{
    return fetchFromApi(process.env.REACT_APP_SGGC_URL, returnPostOptions(requestObj), onSuccess, onError);
}
