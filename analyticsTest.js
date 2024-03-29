const BasePage = require("./BasePage");
const ClientsPage = require("./ClientsPage")
const AnalyticstsPage = require("./AnalyticsPage")
const HometsPage = require("./HomePage")
const ActionsPage = require("./ActionsPage")
const logger = require("./logger")

class AnalyticsPageTest {
    constructor() {
        this.testSelenium = new BasePage().selenium
        this.clientsPage = new ClientsPage(this.testSelenium)
        this.analyticstsPage = new AnalyticstsPage(this.testSelenium)
        this.homePage = new HometsPage(this.testSelenium)
        this.actionsPage = new ActionsPage(this.testSelenium)
    }
    
    async main(){
        await this.clientThatNotSold("no", "Sold", "Adi", "Yaacobi", "Sweden", "MartinMassey", "lululemon@lulu.com", "no", "Sold")
        await this.clientEmailCountType()
        await this.countingBiggestCountry()
    }

    //The test check how much client have "no" in sold option, before and after adding new client
    async clientThatNotSold(input, searchBy, FirstName, lastName, countryName, ownerName, email, input2, searchBy2){
        logger.info("start check in analytics page how much client get NO in sold option")
        await this.homePage.navigateToHomePage()
        await this.homePage.movePages("Analytics")
        let countingAnalytics = await this.analyticstsPage.checkOutstandingClients()
        logger.info("start counting in client page how much client have NO in the sold option")
        await this.homePage.movePages("Clients")
        let countingClient = await this.clientsPage.countingAndValidate(input, searchBy)
        logger.info("add new client, the basic sold option will be 'NO'")
        await this.homePage.movePages("Actions")
        await this.actionsPage.addNewClient(FirstName, lastName, countryName, ownerName, email)
        logger.info("start counting in client page how much client have NO in the option sold - the result should be bigger by one")
        await this.homePage.movePages("Clients")
        let countingClientAgain = await this.clientsPage.countingAndValidate(input2, searchBy2)
        logger.info("go back to the analytics page to check that the result get bigger by one")
        await this.homePage.movePages("Analytics")
        let countingAnalyticsAgain = await this.analyticstsPage.checkOutstandingClients()
        if(countingClient == countingAnalytics && countingClientAgain == countingAnalyticsAgain){
        logger.info(`the test work! number of "NO" in client page: ${countingClient} = number of "NO" in analytics page: ${countingAnalytics} && after add another client, number of "NO" in client page: ${countingClientAgain} =  number of "NO" in analytics page:${countingAnalyticsAgain}`)
        }
        else{
           logger.error("ERROR: there is problem in the test")
        }
    }

    //The test check in analytics page how much client have 'email sent' option (A/B/C/D) and count in client page all the email type option and validate them
    async clientEmailCountType(){
        logger.info("start check in analytics page how much client have 'email sent' option, which mean client that have email type: A/B/C/D")
        await this.homePage.navigateToHomePage()
        await this.homePage.movePages("Analytics")
        let emailCountInAnalytics = await this.analyticstsPage.checkEmailSentClients()
        logger.info("counting in client page all the option of email type, every time one option - A/B/C/D")
        await this.homePage.movePages("Clients")
        let emailCountInCLient = await this.clientsPage.countingEmailType("Email Type")
        logger.info("after finish counting, check again in analytics page to check if the result are the same")
        await this.homePage.movePages("Analytics")
        let emailCountInAnalytics2 = await this.analyticstsPage.checkEmailSentClients()
        if(emailCountInAnalytics == emailCountInCLient && emailCountInCLient == emailCountInAnalytics2){
            logger.info(`the test work! number of email type in analytics page: ${emailCountInAnalytics} = number of email type in client page: ${emailCountInCLient}`)
        }
        else{
            logger.error("ERROR: there is problem in the test")
        }
    }

    //The test check the biggest country in analytics page and then count all the country in client page and return the biggest country and the time it appear
    async countingBiggestCountry(){
        logger.info("start check in analytics page what the name of the biggest country")
        await this.homePage.navigateToHomePage()
        await this.homePage.movePages("Analytics")
        let countryName = await this.analyticstsPage.checkHottestCountry()
        logger.info("check in clients page all the country and count how many time each country appear")
        await this.homePage.movePages("Clients")
        let countCountry = await this.clientsPage.countingCountry("Country")
        logger.info("after finish counting the result will be object of country and numbers, then check again in analytics page to see thet the country with the biggest number is the same in analytics page")
        await this.homePage.movePages("Analytics")
        let checkCountryNameAgain = await this.analyticstsPage.checkHottestCountry()
        if(countryName == countCountry && countCountry == checkCountryNameAgain){
            logger.info(`the test work! the biggest country in analytics page: ${countryName} = is the same in client page: ${countCountry}`)
        }
        else{
            logger.error("ERROR: there is problem in the test")
        }
    }
}
    
let newAnalyticsPageTest = new AnalyticsPageTest();
newAnalyticsPageTest.main()
