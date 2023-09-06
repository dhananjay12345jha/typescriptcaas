import {Given, Then, When,DataTable} from "@cucumber/cucumber";
import {Signin} from "../models/Signin";
import { assert, expect } from 'chai';
import {world} from '../../support/utils/custom.world';
import {generateRequestPayload,validateOpenAPISpec,validateResponseJSON,getAUserFromAUserPool} from '../../support/utils/helpers';
import {Auth} from "../api/Auth";
import { AxiosResponse } from "axios";


let auth = new Auth();

let signInReq:any;
let signInResponse:AxiosResponse;
let username:string;
let password:string;

Given('auth mock is configured to return a {int} response', function (int) {
    world.mockRequestConfigHeader = {headers : {"Prefer" : "code=400"}};
});

Given(/^a user (.*) in a specific brand pool$/, async function (flag:string, inputTable:DataTable) {

    //check if the user is in the user pool, if not call sign-up to create a user 
    signInReq = await generateRequestPayload(new Signin(),inputTable);

    const users = await getAUserFromAUserPool(world.config.userPoolId,`email = "${JSON.parse(signInReq).username}"`);

    if(flag.trim() == "does not exist")
      expect(users.Users.length).is.eq(0);
    else{  
      if(users.Users.length < 1)
        world.log.debug("ToDo:User is not in user pool, sign up before continuing");
      else
        world.log.debug("User is in user pool, continuing");
    }
});

When('the above user attempts to signin to the brand', async function () {
  signInResponse = await auth.signinAUser(world.config.authAPIVersion,signInReq);
});

When("the user attempts to signin to the brand", async function(){
  const inputbody:any = JSON.stringify(new Signin(username,password));
  signInResponse = await auth.signinAUser(world.config.authAPIVersion,inputbody);
});

Then(/^user is(.*)signed in successfully$/,function(flag:string){
  
  if(flag.trim() == "not"){
    expect(signInResponse.status.toString()).to.be.eq("400");
  }
  else{
    expect(signInResponse.status.toString()).to.be.eq("200");

    // need to check if the file ref can be made directly from the actual repo location
    validateOpenAPISpec(signInResponse,"./src/fixtures/openAPISchema/auth-api-public.yaml");

    //retrieve the auth token to be used by other steps 
    const responseObject:any = signInResponse.data
    world.accessToken = responseObject?.accessToken;
    world.identityToken = responseObject?.identityToken;
    world.refreshToken = responseObject?.refreshToken;
  }

});

Given('user tries to signin with below details', async function (inputTable:DataTable) { 
  let inputbody:string = await generateRequestPayload(new Signin(),inputTable);
  signInResponse = await auth.signinAUser(world.config.authAPIVersion,inputbody);
});

When('user tries to signin to {string} version with below details', async function(ver:string, inputTable:DataTable) {
    let inputbody:string = await generateRequestPayload(new Signin(),inputTable);
    signInResponse = await auth.signinAUser(ver,inputbody);
  });

Then('the signin response has below details', function (inputTable:DataTable) {
    validateResponseJSON(signInResponse.data,inputTable);
});
