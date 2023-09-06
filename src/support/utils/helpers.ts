import { DataTable } from "@cucumber/cucumber";
import {readFileSync, writeFileSync} from 'fs';
import * as randomstring from "randomstring";
import chai from 'chai';
import {expect} from "chai";
import chaiResponseValidator from 'chai-openapi-response-validator';
import * as path from "path";
import {JSONPath} from 'jsonpath-plus';
import { world } from "./custom.world";
import AWS from 'aws-sdk';
// import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';


export function validateOpenAPISpec(response:any, relativeSpecFilePath:string){
    chai.use(chaiResponseValidator(path.resolve(relativeSpecFilePath)));
    expect(response).to.satisfyApiSpec;
}

// the data table fields are expected in two-dimensional with only one row 
// | username      | password |
// | ptesttest.com | test12   |
// also this library method is for now working only for top-level string fields 
// can be extended in future for nested objects  
export function generateRequestPayload(templateReqJson:any,inputTable:DataTable){
    for (let key in inputTable.hashes()[0]) { //TodO:move to foreach
        templateReqJson[key] = inputTable.hashes()[0][key];
    }
    return JSON.stringify(templateReqJson);
}

export function validateResponseJSON(json:any,inputTable:DataTable){
    // ideal to use soft assert something for future
    for(let k in inputTable.rows()){
        let result = JSONPath({path:`${inputTable.rows()[k][0]}`,json});
        console.log(`${inputTable.rows()[k][0]} : ${result}`);
        if(inputTable.rows()[k][1] != "null"){
            expect(result, `${inputTable.rows()[k][0]}`).to.be.not.empty;
            if(inputTable.rows()[k][1] != "any")
                expect(result, `${inputTable.rows()[k][0]}`).to.contain(inputTable.rows()[k][1])
        }
        else{
            expect(result, `${inputTable.rows()[k][0]}`).to.be.empty;
        }
    }
}

export async function getAUserFromAUserPool(userPoolId:string, query:string){
    if(world.cognitoServiceProvider == null){
        // Set the AWS Region.
        AWS.config.update({ region: 'eu-west-1' });
        // Initialize CogntioIdentityServiceProvider SDK.
        world.cognitoServiceProvider = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});
    }
    let params = {
        UserPoolId: `${userPoolId}`, 
        Filter: `${query}`,
        Limit: '1'
    };
    world.log.debug(params);
    const data = await world.cognitoServiceProvider.listUsers(params).promise();
    world.log.debug(data);
    return data; //will return an empty users array if user is not found
}