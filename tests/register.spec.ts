import {test,expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import fs from 'fs';
import {parse} from 'csv-parse/sync'; //install using this command npm install csv-parse 

//creating registeration data type
type RegData = {
    firstName:string,
    lastName:string,
    telephone:string,
    password:string,
    subscribenews:string
}

//reads data from csv file
let fileContent = fs.readFileSync('./data/register.csv','utf-8');
let registrationData:RegData[] = parse(fileContent,{columns:true,skip_empty_lines:true});

for(let user of registrationData)
{
test(`verify user is able to register ${user.firstName}`,async ({page,baseURL})=>{

    let loginPage = new LoginPage(page);
    await loginPage.goToLoginPage(baseURL);
    let reigsterPage:RegisterPage = await loginPage.navigateToRegisterPage();
    let isUserRegistered:boolean = await reigsterPage.registerUser(user.firstName,user.lastName,getRandomEmail(),user.telephone,user.password,user.subscribenews);
    expect(isUserRegistered).toBeTruthy();
})
}

function getRandomEmail():string{
let randomEmail = Math.random().toString(36).substring(2,9);
return `auto_${randomEmail}@nal.com`;
}