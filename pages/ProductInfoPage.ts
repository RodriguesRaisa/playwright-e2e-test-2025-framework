import {Page,Locator} from '@playwright/test';
import {ElementUtil} from '../utils/ElementUtil';

export class ProductInfoPage{

    private readonly page: Page;
    private readonly eleUtil:ElementUtil;
    private readonly headerLocator : Locator;
    private readonly imgCountLocator : Locator;
    private readonly productMetaData : Locator;
    private readonly productPriceData : Locator;
    private readonly productMap = new Map<string,string|number| null>(); //generics of the Map

    constructor(page:Page)
    {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.headerLocator = page.locator('h1');
        this.imgCountLocator = page.locator(`//div[@id='content']//img`);
        this.productMetaData = page.locator(`(//div[@id='content']//ul[@class='list-unstyled'])[1]/li`);
        this.productPriceData = page.locator(`(//div[@id='content']//ul[@class='list-unstyled'])[2]/li`);
    
    }

    //action/methods
    async getProductHeader():Promise<string>
    {
        let headerText:string = await this.eleUtil.getInnerText(this.headerLocator);
        console.log('Product header is :'+headerText);
        return headerText.trim();
    }

    async getProductImagesCount():Promise<number>
    {
        await this.eleUtil.waitForElementVisible(this.imgCountLocator);
        let imgCount:number = await this.imgCountLocator.count();
        console.log("Number of images of product are :"+imgCount);
        return imgCount;
    }

    async getProductDetails():Promise<Map<string,string|number|null>>{
       
        this.productMap.set('header', await this.getProductHeader());
        this.productMap.set('imagecount', await this.getProductImagesCount());
        await this.getProductMetaData();
        await this.getProductPricingData();

        console.log(`Full product details for product: ${await this.getProductHeader()}`);
        this.printProductDetails();
        return this.productMap;
    }

    private async printProductDetails()
    {
        //iterate map or hashmap in typescript
        for(const [key,value] of this.productMap)
        {
            console.log(key,value);
        }
    }

//Brand: Apple
//Product Code: Product 18
//Reward Points: 800
//Availability: Out Of Stock

    private async getProductMetaData(){
        let productData : string[] = await this.productMetaData.allInnerTexts();
        for(let p of productData)
        {
            let metaData: string[] = p.split(':'); //splitting on basis of colon
            let metaKey = metaData[0].trim();//storing key that is present at 0th index
            let metaValue = metaData[1].trim();//storing value that is present at 1th index
            this.productMap.set(metaKey,metaValue);
        }
    }
   
  private  async getProductPricingData() {
        let productPricing: string[] = await this.productPriceData.allInnerTexts();
        let productPrice = productPricing[0].trim();
        let productExTax = productPricing[1].split(':')[1].trim();

        this.productMap.set('price', productPrice);
        this.productMap.set('extaxprice', productExTax);
    }
}
