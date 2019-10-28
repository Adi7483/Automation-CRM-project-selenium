const BasePage = require("./BasePage");
const ActionsPage = require("./ActionsPage");
const ClientsPage = require("./ClientsPage")
const AnalyticstsPage = require("./AnalyticsPage")
const HometsPage = require("./HomePage")
const logger = require("./logger")

class ActionPageTest {
    constructor() {
        this.testSelenium = new BasePage().selenium
        this.actionsPage = new ActionsPage(this.testSelenium)
        this.clientsPage = new ClientsPage(this.testSelenium)
        this.analyticstsPage = new AnalyticstsPage(this.testSelenium)
        this.homePage = new HometsPage(this.testSelenium)
    }
  async main(){
    await this.addNewClients("Adi", "Yaacobi", "Sweden", "MartinMassey", "lululemon@lulu.com", "Adi Yaacobi", "Name")
    await this.updateClients("Adi Yaacobi", "Walter White", "B", "Name")
    await this.addAndUpdate("Idan", "Yaacobi", "Sweden", "MartinMassey", "lululemon@lulu.com", "Idan Yaacobi", "Name", "Idan Yaacobi", "MartinMassey", "A",  "A", "Email Type", "A")
  }
    //The test add new client and check if he exist in client page
    async addNewClients(FirstName, lastName, countryName, ownerName, email, input, searchBy){
        await this.homePage.navigateToHomePage()
        await this.homePage.movePages("Actions")
        logger.info("add new client")
        let checkAddClient = await this.actionsPage.addNewClient(FirstName, lastName, countryName, ownerName, email)
        logger.info("check in client page that the new client was added")
        await this.homePage.movePages("Clients")
        let checkResult = await this.clientsPage.searchAndValidateClient(input, searchBy)
        if(checkAddClient && checkResult){
            logger.info(`Add new client test work. add new client result is:${checkAddClient}, and validat client result is:${checkResult}`)
        }
        else{
            logger.error("ERROR in the test of add new client")
        }
    }

    //The test check UPDATE email type client and validate it in client page
    async updateClients(inputName, inputOwner, inputEmail, searchBy){
        logger.info("The test check the 'update' option in action page")
        await this.homePage.navigateToHomePage()
        await this.homePage.movePages("Actions")
        logger.info("update a client")
        let checkUpdate = await this.actionsPage.updateCLient(inputName, inputOwner, inputEmail)
        logger.info("check if the update appear in clients page")
        await this.homePage.movePages("Clients")
        let checkResult = await this.clientsPage.searchAndValidateClientDetais(inputName, searchBy, inputEmail)
        if(checkUpdate && checkResult){
            logger.info(`Update client test work. result of update new client is: ${checkUpdate}, and validate the result in client page is: ${checkResult}`) 
        }
        else{
            logger.error("ERROR: there is problem in the test of update client")
        }
    }

    //The test add new client, update his email type, and check if he's exist with the change before and after the update
    async addAndUpdate(FirstName, lastName, countryName, ownerName, email, input, searchBy, inputName, ownerName2, email2, inputEmail){
        logger.info("add new client")
        await this.homePage.navigateToHomePage()
        await this.homePage.movePages("Actions")
        let checkAddResult = await this.actionsPage.addNewClient(FirstName, lastName, countryName, ownerName, email)
        logger.info("Check in client page if the new client exist")
        await this.homePage.movePages("Clients")
        let checkSearchResult = await this.clientsPage.searchAndValidateClient(input, searchBy)
        logger.info("go back to ACTION page and now update this client")
        await this.homePage.movePages("Actions")
        let checkUpdate = await this.actionsPage.updateCLient(inputName, ownerName2, email2)
        logger.info("check in client page if the change appear")
        await this.homePage.movePages("Clients")
        let checkUpdateResult = await this.clientsPage.searchAndValidateClientDetais(input, searchBy, inputEmail)
        if(checkAddResult && checkSearchResult && checkUpdate && checkUpdateResult){
            logger.info(`Add new client and update test work. add new client is: ${checkAddResult}, search this client in client page is: ${checkSearchResult}, update new client is:${checkUpdate}, and search the new update is: ${checkUpdateResult}   `)
        }
        else{
            logger.error("ERROR: there is problem in the test")
        }
    }
}



let clientPageTest = new ActionPageTest();
clientPageTest.main()
