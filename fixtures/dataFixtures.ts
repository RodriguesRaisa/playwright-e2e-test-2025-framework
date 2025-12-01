import {test as base,expect} from '@playwright/test';
import fs from 'fs';
import {parse} from 'csv-parse/sync'; 

type RegData = {
    firstName:string,
    lastName:string,
    telephone:string,
    password:string,
    subscribenews:string
}



//create fixture
type csvFixture = {
    registerData:RegData[];
}

export const testdata = base.extend<csvFixture>({
    registerData : async ({},use)=>{
        let fileContent = fs.readFileSync('./data/register.csv','utf-8');
        let registrationData:RegData[] = parse(fileContent,{columns:true,skip_empty_lines:true});
        await use(registrationData);
    }
});

export {expect};