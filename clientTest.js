const BasePage = require("./BasePage");
const ClientsPage = require("./ClientsPage")
const HometsPage = require("./HomePage")
const AnalyticstsPage = require("./AnalyticsPage")
const logger = require("./logger")

class ClientsPageTest {
    constructor() {
        this.testSelenium = new BasePage().selenium
        this.clientsPage = new ClientsPage(this.testSelenium)
        this.homePage = new HometsPage(this.testSelenium)
        this.analyticstsPage = new AnalyticstsPage(this.testSelenium)
    }
    async main(){
        await this.clientTest("Adi Yaacobi", "Name")
        await this.clickClient("nadia", "Name", "nadi")
        await this.countingAndValidateWord("no", "Sold")
    }

    //The test search name in client page and validate the result
    async clientTest(details, searchOption){
        await this.homePage.navigateToHomePage()
        await this.homePage.movePages("Clients");
        logger.info("start check the 'search' client option")
        let checkResult = await this.clientsPage.searchAndValidateClient(details, searchOption)
        if (checkResult == true){
            logger.info("the search name test work")
        }
        else{
            logger.error("ERROR in the searhc name test")
        }
    }

    //The test check the option to click on client, update the client name, and check if the new client exist
    async clickClient(details, searchOption, updateName){
        logger.info("Check the option to click on client and update his details")
        await this.homePage.navigateToHomePage()
        await this.homePage.movePages("Clients")
        let checkUpdate =  await this.clientsPage.clickOnClientAndUpdate(details, searchOption, updateName)
        if (checkUpdate == true){
            logger.info("the test click on client and update is work")
        }
        else{
            logger.error("ERROR in the test of click on client and update")
        }
    }

    //The test count the "NO" in sold option, in analytics and client page and validate them
    async countingAndValidateWord(details, searchOption){
        logger.info("check client with 'NO' sold in client page")
        await this.homePage.navigateToHomePage()
        await this.homePage.movePages("Clients")
        let countNoSoldInClient = await this.clientsPage.countingAndValidate(details, searchOption)
        logger.info("check how much client have 'NO' in the sold option in analytics page")
        await this.homePage.movePages("Analytics")
        let countNoSold =  await this.analyticstsPage.checkOutstandingClients()
        if(countNoSold == countNoSoldInClient){
            logger.info(`the test of counting "NO" sold option is work. number of "NO" in analytics page:${countNoSold}, is the same as the number in client page: ${countNoSoldInClient}`)
        }
        else{
            logger.error("ERROR: there is problem in the test of counting 'NO' sold option")
        }
    }
}  
  
let clientPageTest = new ClientsPageTest();
clientPageTest.main()



