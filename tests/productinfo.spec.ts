import {LoginPage} from '../pages/LoginPage';
import {HomePage} from '../pages/HomePage';
import {ResultsPage} from '../pages/ResultsPage';
import {ProductInfoPage} from '../pages/ProductInfoPage';
// import {test,expect} from '@playwright/test';
import {test,expect} from '../fixtures/baseFixtures' 

let productData = [
    {searchkey:'macbook',productname:'MacBook Pro',imagescount:4},
    {searchkey:'macbook',productname:'MacBook Air',imagescount:4},
    {searchkey:'samsung',productname:'Samsung Galaxy Tab 10.1',imagescount:7},
];


for(let p of productData)
{
test(`verify info of the product and its images ${p.productname} : ${p.imagescount}`,{tag:['@product','@regression','@sanity'],annotation:[{type:'epic',description:'EPIC-100 Design product info page'},{type:'feature',description:'Product info feature'}]},async({homePage})=>{

    // let loginPage = new LoginPage(page);
    // await loginPage.goToLoginPage();
    // let homePage:HomePage = await loginPage.doLogin("testautonew@gmail.com","test@123");
    let resultsPage:ResultsPage = await homePage.doSearch(p.searchkey);
    let productInfoPage : ProductInfoPage =await resultsPage.selectProduct(p.productname);
    expect(await productInfoPage.getProductHeader()).toBe(p.productname);
    expect(await productInfoPage.getProductImagesCount()).toBe(p.imagescount);
})
}

 test(`verify product MetaData `, async ({ homePage }) => {

        // let loginPage = new LoginPage(page);
        // await loginPage.goToLoginPage();
        // let homePage:HomePage = await loginPage.doLogin("testautonew@gmail.com","test@123");
        let resultsPage:ResultsPage = await homePage.doSearch('macbook');
        
        let productInfoPage: ProductInfoPage = await resultsPage.selectProduct('MacBook Pro');
        
        let actualProductFullDetails = await productInfoPage.getProductDetails();
     
        expect.soft(actualProductFullDetails.get('header')).toBe('MacBook Pro');
        expect.soft(actualProductFullDetails.get('Brand')).toBe('Apple');
        expect.soft(actualProductFullDetails.get('Product Code')).toBe('Product 18');
        expect.soft(actualProductFullDetails.get('Reward Points')).toBe('800');
        expect.soft(actualProductFullDetails.get('Availability')).toBe('Out Of Stock');

    });

