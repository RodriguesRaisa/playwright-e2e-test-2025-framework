import test from '@playwright/test';
import {testdata,expect} from '../fixtures/dataFixtures';
import { LoginPage } from '../pages/LoginPage';


function getRandomEmail():string{
let randomEmail = Math.random().toString(36).substring(2,9);
return `auto_${randomEmail}@nal.com`;
}

// test(`register a user from CSV`,async({registerData,page,baseURL})=>{
//     let loginPage = new LoginPage(page);
//     await loginPage.
// })

//Do not create datafixtures, because this supports sequnetial execution and not parallel 
//execution