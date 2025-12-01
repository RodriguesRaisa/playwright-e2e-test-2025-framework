// import {test,expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {HomePage} from '../pages/HomePage';
import {ResultsPage} from '../pages/ResultsPage';
import {test,expect} from '../fixtures/baseFixtures' 

//dataprovider for searchKey and resultscount
let searchTestData = [
    {searchKey:'macbook',resultsCount:3},
    {searchKey:'samsung',resultsCount:2},
    {searchKey:'imac',resultsCount:1},
    {searchKey:'Dummy',resultsCount:0},
];


for(let s of searchTestData)
{
    test(`validate search test ${s.searchKey}`,async({homePage})=>{

    // let loginPage:LoginPage = new LoginPage(page);
    // await loginPage.goToLoginPage(baseURL);
    // let homePage:HomePage = await loginPage.doLogin("testautonew@gmail.com","test@123");
    let resultsPage:ResultsPage = await homePage.doSearch(s.searchKey);
    expect(await resultsPage.getSearchResultsCount()).toBe(s.resultsCount);
})
}


