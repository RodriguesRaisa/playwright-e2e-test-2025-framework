import {Page,Locator,expect} from '@playwright/test';

type flexibleLocator = string|Locator;

export class ElementUtil{
    private page:Page;
    private defaultTimeOut:number =3000;

    constructor(page:Page,timeOut:number=3000){
        this.page = page;
        this.defaultTimeOut = timeOut;
    }
 
    /**
     * this method to convert the string to Locator else it will return the semantic based locators on the basis of given index
     * @param locator 
     * @param index
     * @returns 
     */

     //await page.locator(`#email`).fill('test@gmail.com')
    // await page.getByRole('link',{name:'Continue'}).click();
    //if getElementLocator("//input[@id='email']") i.e String
    //returns: this.page.locator("//input[@id='email'])
    //If locator is not string, getElementLocator((page.getByRole('button', { name: 'Submit' }))
    //return page.getByRole('button', { name: 'Submit' })

    private getElementLocator(locator: flexibleLocator, index?: number): Locator {
        if (typeof locator === 'string') {
            if (index) {
                return this.page.locator(locator).nth(index);
            }
            else { 
                return this.page.locator(locator).first();
            }
        }
        else {
            if (index) {
                return locator.nth(index);
            }
            else { 
                return locator.first();
            }
        }
    }

    /**
     * Click on an element
     * @param locator 
     * @param options
     * @param index
     */

    async click(locator:flexibleLocator,options?:{force?:boolean;timeout?:number},index?:number):Promise<void>
    {
         await this.getElementLocator(locator, index).click({
            force: options?.force,
            timeout: options?.timeout || this.defaultTimeOut
        });
        console.log(`Clicked on element : ${locator}`);
    }

     /**
     * Fill text into an input field
     * @param locator 
     * @param text 
     */
    async fill(locator:flexibleLocator,value:string):Promise<void>{
        await this.getElementLocator(locator).fill(value,{timeout:this.defaultTimeOut});
        console.log(`Filled the text ${value} in the element ${locator}`)
    }

    /**
     * Double click on element
     * @param locator
     */
     async dblclick(locator:flexibleLocator):Promise<void>
    {
        await this.getElementLocator(locator).dblclick({timeout:this.defaultTimeOut});
        console.log(`Double clicked on element: ${locator}`);
    }

    /**
     * Right Click on element
     * @param locator 
     */
     async rightClick(locator:flexibleLocator):Promise<void>
    {
        await this.getElementLocator(locator).click({
            button:'right',
            timeout:this.defaultTimeOut
        });
        console.log(`Right clicked on element: ${locator}`);
    }

    /**
     * Type text with delay (default delay: 500 ms)
     * @param locator 
     * @param text 
     * @param delay 
     */
    async type(locator:flexibleLocator,value:string,delay:number=500):Promise<void>{
        await this.getElementLocator(locator).pressSequentially(value,{delay,timeout:this.defaultTimeOut});
        console.log(`Filled the text ${value} in the element ${locator}`)
    }

    async clear(locator:flexibleLocator):Promise<void>{
        await this.getElementLocator(locator).clear({timeout:this.defaultTimeOut});

    }

    /**
     * Get text content of an element
     */
    async getText(locator:flexibleLocator):Promise<string | null>
    {
        const text = await this.getElementLocator(locator).textContent({timeout:this.defaultTimeOut});
        return text;
    }

    /**
     * Get attribute value of an element
     */
    async getInnerText(locator:flexibleLocator):Promise<string>
    {
        const text = await this.getElementLocator(locator).innerText({timeout:this.defaultTimeOut});
        return text;
    }

    /**
     * Get input value of an element(text field)
     */
    async getAttributeValue(locator:flexibleLocator,attributeName:string):Promise<string | null>
    {
        return await this.getElementLocator(locator).getAttribute(attributeName);
    }

    /**
     * Get input value of an element(text field)
     */
    async getInputValue(locator:flexibleLocator):Promise<string | null>
    {
        return await this.getElementLocator(locator).inputValue({timeout:this.defaultTimeOut});
    }

    /**
     * Get all text contentfrom multiple elements
     */ 
    async getAllInnerTexts(locator:flexibleLocator):Promise<string[]>
    {
        return await this.getElementLocator(locator).allInnerTexts();
    }



//========================Element visiblity  & state check============================//

    /**
     * check element is visible
     */
    async isVisible(locator:flexibleLocator,index?:number):Promise<boolean>
    {
        return await this.getElementLocator(locator,index).isVisible({timeout:this.defaultTimeOut});
    }

    /**
     * check element is hidden
     */
     async isHidden(locator:flexibleLocator):Promise<boolean>
    {
        return await this.getElementLocator(locator).isHidden({timeout:this.defaultTimeOut}); 
    }

    /**
     * check element is enabled
     */
     async isEnabled(locator:flexibleLocator):Promise<boolean>
    {

        return await this.getElementLocator(locator).isEnabled({timeout:this.defaultTimeOut});
  
    }

    /**
     * check element is disabled
     */
     async isDisbaled(locator:flexibleLocator):Promise<boolean>
    {
        return await this.getElementLocator(locator).isDisabled();  
    }

    /**
     * check element is checked (radio/checkbox)
     */
    async isChecked(locator:flexibleLocator):Promise<boolean>
    {
        return await this.getElementLocator(locator).isChecked(); 
    }

    /**
     * check element is editable
     */
    async isEditable(locator:flexibleLocator):Promise<boolean>
    {
        return await this.getElementLocator(locator).isEditable(); 
    }


//=============================Wait Utils====================================//

    /**
     * wait for element to be visible
     */
    async waitForElementVisible(locator:flexibleLocator,timeout:number =5000):Promise<boolean>
    {
        try{
            await this.getElementLocator(locator).waitFor({state:'visible',timeout});
            console.log(`wait for element to be visible`);
            return true;
        }
        catch{
            return false;
        }
    }

    /**
     * wait for element to be attached to DOM
     */
    async waitForElementAttached(locator:flexibleLocator,timeout:number =5000):Promise<boolean>
    {
        try{
            await this.getElementLocator(locator).waitFor({state:'attached',timeout});
            console.log(`wait for element to be attached`);
            return true;
        }
        catch{
            return false;
        }
    }

    /**
     * wait for page load state
     */
    async waitForPageLoad(state:'load'|'domcontentloaded'|'networkidle'='load'):Promise<void>{
        await this.page.waitForLoadState(state); 
        console.log(`waited for page load state: ${state}`);
    }

    /**
     * wait for a specific timeout (static)
     */
    async sleep(timeOut:number):Promise<void>{
        this.page.waitForTimeout(timeOut);
        console.log(`waited for ${timeOut} ms`);
    }


//***********************DropDown Utils /Select Based DropDown *******************//

    async selectByText(locator:flexibleLocator,text:string)
    {
        await this.getElementLocator(locator).selectOption({label:text},{timeout:this.defaultTimeOut})
        console.log(`selected option ${text} from dropdown ${locator}`);
    }

    async selectByValue(locator:flexibleLocator,value:string)
    {
        await this.getElementLocator(locator).selectOption({value:value},{timeout:this.defaultTimeOut})
        console.log(`selected option ${value} from dropdown ${locator}`);
    }

    async selectByOption(locator:flexibleLocator,index:number)
    {
        await this.getElementLocator(locator).selectOption({index:index},{timeout:this.defaultTimeOut})
        console.log(`selected option ${index} from dropdown ${locator}`);
    }
}