const BasePage = require("./BasePage");
const ClientsPage = require("./ClientsPage")
const HometsPage = require("./HomePage")
const AnalyticstsPage = require("./AnalyticsPage")

class ClientsPageTest {
    constructor() {
        this.testSelenium = new BasePage().selenium
        this.clientsPage = new ClientsPage(this.testSelenium)
        this.homePage = new HometsPage(this.testSelenium)
        this.analyticstsPage = new AnalyticstsPage(this.testSelenium)
    }
   
    //The test search name in client page and validate the result
    async clientTest(details, searchOption){
        await this.homePage.navigateToHomePage()
        await this.homePage.movePages("Clients");
        console.log("start check the 'search' client option")
        let checkResult = await this.clientsPage.searchAndValidateClient(details, searchOption)
        if (checkResult == true){
            console.log("the test success")
        }
        else{
            console.error("ERROR in the test")
        }
    }

    //The test check the option to click on client, update the client name, and check if the new client exist
    async clickClient(details, searchOption, updateName){
        console.log("Check the option to click on client and update his details")
        await this.homePage.navigateToHomePage()
        await this.homePage.movePages("Clients")
        let checkUpdate =  await this.clientsPage.clickOnClientAndUpdate(details, searchOption, updateName)
        if (checkUpdate == true){
            console.log("the test success")
        }
        else{
            console.error("ERROR in the test")
        }
    }

    //The test count the "NO" in sold option, in analytics and client page and validate them
    async countingAndValidateWord(details, searchOption){
        console.log("check client with 'NO' sold in client page")
        await this.homePage.navigateToHomePage()
        await this.homePage.movePages("Clients")
        let countNoSoldInClient = await this.clientsPage.countingAndValidate(details, searchOption)
        console.log("check how much client have 'NO' in the sold option in analytics page")
        await this.homePage.movePages("Analytics")
        let countNoSold =  await this.analyticstsPage.checkOutstandingClients()
        if(countNoSold == countNoSoldInClient){
            console.log(`the test work! number of "NO" in analytics page:${countNoSold}, is the same as the number in client page: ${countNoSoldInClient}`)
        }
        else{
            console.error("ERROR: there is problem in the test")
        }
    }
}  
  
let clientPageTest = new ClientsPageTest();
clientPageTest.clientTest("Adi Yaacobi", "Name")
clientPageTest.clickClient("nadia", "Name", "nadi")
clientPageTest.countingAndValidateWord("no", "Sold")



