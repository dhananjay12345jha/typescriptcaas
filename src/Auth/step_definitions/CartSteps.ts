import {Given, Then, When} from "@cucumber/cucumber";
import * as randomstring from "randomstring";
import {Signin} from "../models/Signin";
import {Auth} from "../api/Auth"
import { assert, expect } from 'chai';
import {world} from '../../support/utils/custom.world';

// this might be moved to CTTools component when it is created 
Then("user is able to retrieve his cart details",function(){
    world.log.debug("ToDo:user is able to retrieve cart for this brand");
    world.log.debug("confim that the accessToken is readable in this step"+(world.accessToken));

    // do additional checks if world.env is integ --flag to control step logic based on the type of tests being run
});