import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import {test,expect} from '../fixtures/baseFixtures'

//From testrunner give me the page hence async({page})
test('verify valid login @sanity',async({homePage})=>{

    await expect(homePage.page).toHaveTitle('My Account');
    //instead of writing following code, we will now make use of fixtures
    //instead of using page as destructuring object in sync function async({page}), we will now
    //use async({homePage})
    //AAA
    //arrange
    // let loginPage = new LoginPage(page);

    //act
    // await loginPage.goToLoginPage();
    // let homePage:HomePage = await loginPage.doLogin('testautonew@gmail.com','test@123');
    // expect(await homePage.isUserLoggedIn()).toBeTruthy();

});

test('verify invalid login',async({page,baseURL})=>{

    //AAA (Arrange act and assert)
    //arrange
    let loginPage = new LoginPage(page);
    //we are not using destructuring of homePage because we are doing invalid login
    //act
    await loginPage.goToLoginPage(baseURL);
    await loginPage.doLogin('pwtest@nal.com','test@12455766');
    const errorMsg = await loginPage.getInvalidLoginMsg();
    expect(errorMsg).toContain('Warning: No match for E-Mail Address and/or Password.');

});