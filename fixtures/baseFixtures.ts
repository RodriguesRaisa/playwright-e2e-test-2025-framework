import {test as base,expect} from '@playwright/test';
//new name of test is base i.e alias
import {HomePage} from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

type MyFixtures = {
    homePage:HomePage;
};

//extend the base to define your custom fixture
//Which method to use to define custom fixture ? base.extend
//homePage is a function name , page,baseURl ,use and testInfo are the objects
//move the login part to the fixture , which is common for all the testcases

export const test = base.extend<MyFixtures>({
   homePage :async ({page,baseURL},use,testInfo)=>{

        const loginPage = new LoginPage(page);
        //taking baseURL from config file and passing object baseURL to goToLoginPage
        await loginPage.goToLoginPage(baseURL);
       
        //capturing metadata from config file
        const username:string = testInfo.project.metadata.appUsername;
        const password:string = testInfo.project.metadata.appPassword;
        
        const homePage = await loginPage.doLogin(username,password);
        expect(await homePage.isUserLoggedIn()).toBeTruthy();

        //purpose of use : what exactly you want to supply from fixture to testcase
        //use is going to give something
        await use(homePage);

    }
});

export {expect};