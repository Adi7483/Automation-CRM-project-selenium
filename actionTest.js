const BasePage = require("./BasePage");
const ActionsPage = require("./ActionsPage");
const ClientsPage = require("./ClientsPage")
const AnalyticstsPage = require("./AnalyticsPage")
const HometsPage = require("./HomePage")

class ActionPageTest {
    constructor() {
        this.testSelenium = new BasePage().selenium
        this.actionsPage = new ActionsPage(this.testSelenium)
        this.clientsPage = new ClientsPage(this.testSelenium)
        this.analyticstsPage = new AnalyticstsPage(this.testSelenium)
        this.homePage = new HometsPage(this.testSelenium)
    }

    //The test add new client and check if he exist in client page
    async addNewClients(FirstName, lastName, countryName, ownerName, email, input, searchBy){
        await this.homePage.navigateToHomePage()
        await this.homePage.movePages("Actions")
        console.log("add new client")
        let checkAddClient = await this.actionsPage.addNewClient(FirstName, lastName, countryName, ownerName, email)
        console.log("check in client page that the new client was added")
        await this.homePage.movePages("Clients")
        let checkResult = await this.clientsPage.searchAndValidateClient(input, searchBy)
        if(checkAddClient && checkResult){
            console.log(`The test work, add new client result is:${checkAddClient}, and validat client result is:${checkResult}`)
        }
        else{
            console.error("ERROR in the test")
        }
    }

    //The test check UPDATE email type client and validate it in client page
    async updateClients(inputName, inputOwner, inputEmail, searchBy){
        console.log("The test check the 'update' option in action page")
        await this.homePage.navigateToHomePage()
        await this.homePage.movePages("Actions")
        console.log("update a client")
        let checkUpdate = await this.actionsPage.updateCLient(inputName, inputOwner, inputEmail)
        console.log("check if the update appear in clients page")
        await this.homePage.movePages("Clients")
        let checkResult = await this.clientsPage.searchAndValidateClientDetais(inputName, searchBy, inputEmail)
        if(checkUpdate && checkResult){
            console.log(`the test work! result of update new client is: ${checkUpdate}, and validate the result in client page is: ${checkResult}`) 
        }
        else{
            console.error("ERROR: there is problem in the test")
        }
    }

    //The test add new client, update his email type, and check if he's exist with the change before and after the update
    async addAndUpdate(FirstName, lastName, countryName, ownerName, email, input, searchBy, inputName, ownerName2, email2, inputEmail){
        console.log("first add new client")
        await this.homePage.navigateToHomePage()
        await this.homePage.movePages("Actions")
        let checkAddResult = await this.actionsPage.addNewClient(FirstName, lastName, countryName, ownerName, email)
        console.log("Check in client page if the new client exist")
        await this.homePage.movePages("Clients")
        let checkSearchResult = await this.clientsPage.searchAndValidateClient(input, searchBy)
        console.log("go back to ACTION page and now update this client")
        await this.homePage.movePages("Actions")
        let checkUpdate = await this.actionsPage.updateCLient(inputName, ownerName2, email2)
        console.log("check in client page if the change appear")
        await this.homePage.movePages("Clients")
        let checkUpdateResult = await this.clientsPage.searchAndValidateClientDetais(input, searchBy, inputEmail)
        if(checkAddResult && checkSearchResult && checkUpdate && checkUpdateResult){
            console.log(`the test work! add new client is: ${checkAddResult}, search this client in client page is: ${checkSearchResult}, update new client is:${checkUpdate}, and search the new update is: ${checkUpdateResult}   `)
        }
        else{
            console.error("ERROR: there is problem in the test")
        }
    }
}

let clientPageTest = new ActionPageTest();
clientPageTest.addNewClients("Adi", "Yaacobi", "Sweden", "MartinMassey", "lululemon@lulu.com", "Adi Yaacobi", "Name")
clientPageTest.updateClients("Adi Yaacobi", "Walter White", "B", "Name")
clientPageTest.addAndUpdate("Idan", "Yaacobi", "Sweden", "MartinMassey", "lululemon@lulu.com", "Idan Yaacobi", "Name", "Idan Yaacobi", "MartinMassey", "A",  "A", "Email Type", "A")