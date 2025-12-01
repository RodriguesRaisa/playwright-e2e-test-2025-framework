import {expect, Locator,Page} from '@playwright/test';
import { ElementUtil } from "../utils/ElementUtil";

export class RegisterPage{

    private readonly page:Page;
    private readonly eleUtil;
    private readonly firstName:Locator;
    private readonly lastName:Locator;
    private readonly emailId:Locator;
    private readonly telephone:Locator;
    private readonly password:Locator;
    private readonly passwordConfirm:Locator;
    private readonly newsLetterYesRadio:Locator;
    private readonly newsLetterNoRadio:Locator;
    private readonly agreeCheckBox:Locator;
    private readonly continueButton:Locator;
    private readonly successMsg:Locator;

    constructor(page:Page){
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.firstName = page.getByRole('textbox', { name: 'First Name' });
        this.lastName = page.getByRole('textbox', { name: 'Last Name' });
        this.emailId = page.getByRole('textbox', { name: 'E-Mail' });
        this.telephone = page.getByRole('textbox', { name: 'Telephone' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.passwordConfirm = page.getByRole('textbox', { name: 'Password Confirm' });
        this.newsLetterYesRadio = page.getByText('Yes', { exact: true });
        this.newsLetterNoRadio = page.getByText('No', { exact: true });
        this.agreeCheckBox = page.locator('[name="agree"]');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.successMsg = page.getByText('Your Account Has Been Created!',{exact:true});

    }

    async registerUser(firstName:string,
        lastName:string,
        emailId:string,
        telephone:string,
        password:string,
        newsLetterYesRadio:string
    ):Promise<boolean>{
        await this.eleUtil.fill(this.firstName,firstName);
        await this.eleUtil.fill(this.lastName,lastName);
        await this.eleUtil.fill(this.emailId,emailId);
        await this.eleUtil.fill(this.telephone,telephone);
        await this.eleUtil.fill(this.password,password);
        await this.eleUtil.fill(this.passwordConfirm,password);
        if( newsLetterYesRadio==='Yes')
        {
            await this.eleUtil.click(this.newsLetterYesRadio);

        }
        else
        {
            await this.eleUtil.click(this.newsLetterNoRadio);
        }
        await this.eleUtil.click(this.agreeCheckBox);
        await this.eleUtil.click(this.continueButton);
        return await this.eleUtil.isVisible(this.successMsg);

    }

    // async verifyAcoountCreated(){
    //     await expect(this.successMsg).toBeVisible();
    // }

}
