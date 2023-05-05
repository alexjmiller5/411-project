import { baseUrl } from "../firebaseConfig";
import axios from "axios";



// uid will likely be used with username since that is the best unique user identifer
// that does NOT contain special characters
export function getUserData(username) {
    // use axios to call a curl method  
    var ret = null
    axios({
        method: 'get',
        url: `${baseUrl}/Users/${username}.json?print=pretty`,
    }).then((response) => {
        console.log("\getUserData from ", username, ": ", response.data);
        ret = response.data;
    }).catch(err => {
        console.log("\nget error: ", err);
        ret = null
    });
    return ret
}

export function createUser(username, email) {
    // use axios to call a curl method
    if (getUserData(username) === null) {
        success = false;
        axios({
            method: 'put',
            url: `${baseUrl}/Users/${username}.json`,
            data: { username, email }
        }).then((response) => {
            console.log("\n Newly created User: ", response.data);
            sucess = true;
        }).catch(err => {
            console.log(" post error: ", err);
            sucess = false;
        });
        return success;
    }
    return false
}

export function createWaterFountain(id, lat, long, buildingName, Descr) {
    // use axios to call a curl method 
    success = false;
    axios({
        method: 'put',
        url: `${baseUrl}/WF/${id}.json`,
        data: { lat, long, buildingName, Descr }
    }).then((response) => {
        console.log("\ndata: ", response.data);
        sucess = true;
    }).catch(err => {
        console.log(" post error: ", err);
        sucess = false;
    });
    return sucess;
}