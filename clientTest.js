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
   
    //The test search name in client page
    async clientTest(details, searchOption){
        await this.homePage.navigateToHomePage()
        await this.homePage.movePages("Clients");
        console.log("start check the 'search' client option")
        await this.clientsPage.searchAndValidateClient(details, searchOption)
    }

    //The test search client name and give back only the name and not the all string
    async clientResultSpecific(input, searchBy){
        console.log("check the option to get result of only specific word and not the all string result, in this case the word will be the first name")
        await this.homePage.navigateToHomePage()
        await this.homePage.movePages("Clients")
        await this.clientsPage.getResultOfSpecificInput(input, searchBy)
    }

    //The test check the option to click on client and update the client name
    async clickClient(details, searchOption, updateName){
        console.log("Check the option to click on client and update his details")
        await this.homePage.navigateToHomePage()
        await this.homePage.movePages("Clients")
        await this.clientsPage.clickOnClientAndUpdate(details, searchOption, updateName)
    }

    //The test count the "NO" in sold option, in analytics and client page and validate them
    async countingAndValidateWord(details, searchOption){
        console.log("check how much client have 'NO' in the sold option in analytics page")
        await this.homePage.navigateToHomePage()
        await this.homePage.movePages("Analytics")
       let countNoSold =  await this.analyticstsPage.checkOutstandingClients()
        console.log("check client with 'NO' sold in client page")
        await this.homePage.movePages("Clients")
       let countNoSoldInClient = await this.clientsPage.countingAndValidate(details, searchOption)
        console.log("check again the number of client with 'NO' sold in analytics page to validate that the rsult are the same")
        await this.homePage.movePages("Analytics")
        let countNoSoldAgain = await this.analyticstsPage.checkOutstandingClients()
        if(countNoSold == countNoSoldInClient && countNoSoldInClient == countNoSoldAgain){
            console.log(`the test work! number of "NO" in analytics page:${countNoSold} is the same as the number in client page: ${countNoSoldInClient}`)
        }
        else{
            console.error("ERROR: there is problem in the test")
        }
    }
}  
  
let clientPageTest = new ClientsPageTest();
clientPageTest.clientTest("adi yaacobi", "Name");
clientPageTest.clientResultSpecific("adi yaacobi", "Name");
clientPageTest.clickClient("nadia", "Name", "nadi")
clientPageTest.countingAndValidateWord("no", "Sold")



