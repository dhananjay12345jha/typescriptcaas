import {world} from '../../support/utils/custom.world';
import { AxiosResponse } from "axios";

export class Auth {

    signin:string = "/v1/signin";
    signup: string = "/v1/signup";
    refresh: string = "/v1/refresh";
    signout: string = "/v1/signout";

    public async signinAUser(ver: string, request: string) {
        let response:AxiosResponse;
        // if(ver == "v2"){//for illustration purposes only
        //     const requestConfig:any = {
        //         headers: {'Authorization': 'Basic YlVIZ1oweVNwMzNpVzRudDJpRFVHUVJ1OlA0d1NJd2lTMlNDYjVIWFoxNUgybGE1SXJUM2NWVGlB'},
        //         responseType: 'json',
        //         timeout : 3000        
        //     };
        //     const authResponse = await axios.post("https://auth.europe-west1.gcp.commercetools.com/oauth/prj-catalyst-01/anonymous/token?grant_type=client_credentials","",requestConfig);
        
        //     requestConfig["headers"] = JSON.parse(`{"Authorization": "Bearer ${authResponse.data.access_token}"}`);
        //     response = await axios.post(`${world.config.baseCTToolsURL}`+"/me/login"
        // ,request,requestConfig);

        // }else{
            // const requestConfig:any = {headers : {"Prefer" : "code=400"}};
            let requestConfig:any = world.mockRequestConfigHeader;
            response = await world.axios.post(this.signin, request,requestConfig);
        // }

        world.logMessage = {
            "request": JSON.parse(request),
            "responseStatusCode": response.status,
            "response":response.data
        };
        return response;
    }

    public async signupAUser(request: string) {
        // below is just an example for passing additional config with the request 
        // this will need to be modified when writing the actual tests 
        const headerOptions: string = JSON.stringify({"Content-Type": "application/json"});
        let requestConfig: object = {
            headers: headerOptions,
            responseType: 'json',
            responseEncoding: 'utf8'
        }
        const response = await world.axios.post(this.signup,request,requestConfig);
        return response;
    }

}