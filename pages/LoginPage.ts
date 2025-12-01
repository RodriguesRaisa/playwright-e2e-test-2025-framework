import {Locator, Page} from '@playwright/test';
import {ElementUtil} from '../utils/ElementUtil';
import {HomePage} from '../pages/HomePage';
import {RegisterPage} from '../pages/RegisterPage'

//Export becaue this class will be used somewhere
export class LoginPage{

    //1.Create page locators/page object/OR(Object Repository):
    //To protect your data use private and readonly(kind of final keyword in java)
    //Page is like driver we use in selenium

    private readonly page:Page;
    private readonly eleUtil;
    private readonly emailId:Locator;
    private readonly password:Locator;
    private readonly loginBtn:string;
    private readonly warningMsg:Locator;
    private readonly registerLink:Locator;

    //2.Create page class constructor
    //Constructor will say give me the page

    constructor(page:Page){
        //to access current class properties or variables use this.global variable = local variable of the constructor
        
        this.page = page;

        //The eleUtil is not passed into the constructor — it doesn’t exist yet.
        //Hence we create new instance of ELementUtil
        
        this.eleUtil = new ElementUtil(page);
        this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = `input[type="submit"][value="Login"]`;
        this.warningMsg = page.locator('.alert.alert-danger.alert-dismissible');
        this.registerLink = page.getByRole('link', { name: 'Register' });
    }

    //3.Create page actions/methods

    async goToLoginPage(baseURL:string|undefined){
        await this.page.goto(baseURL+'?route=account/login');
    }
/**
 * Login to app using email and password
 * @param email 
 * @param password 
 * @returns 
 */
    async doLogin(email:string,password:string):Promise<HomePage>
    {
        //using element util generic function
        await this.eleUtil.fill(this.emailId,email);
        await this.eleUtil.fill(this.password,password);
        await this.eleUtil.click(this.loginBtn,{force:true,timeout:5000}); 
        return new HomePage(this.page);     
    }

/**
 * Get page title after successful login
 * @param email 
 * @param password 
 * @returns 
 */
    async getPageTitle(): Promise<string> {
        const pageTitle = this.page.title();
        console.log(`Home Page Title is:${pageTitle}`);
        return pageTitle;
}

/**
 * Get the warning message in case of invalid email password
 * @returns warning message
 */

    async getInvalidLoginMsg():Promise<string|null>{
        const errorMsg = await this.eleUtil.getText(this.warningMsg);
        console.log('invalid login error message'+errorMsg);
        return errorMsg;
    }

    async navigateToRegisterPage()
    {
        await this.eleUtil.click(this.registerLink);
        return new RegisterPage(this.page);
    }
}