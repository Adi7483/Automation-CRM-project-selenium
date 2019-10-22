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
        await this.actionsPage.addNewClient(FirstName, lastName, countryName, ownerName, email)
        console.log("check in client page that the new client was added")
        await this.homePage.movePages("Clients")
        await this.clientsPage.searchAndValidateClient(input, searchBy)
    }

    //The test check the update email type option and validate it in clients and analytics page
    async updateClients(inputName, inputOwner, inputEmail, searchBy){
        console.log("The test check the 'update' option")
        await this.homePage.navigateToHomePage()
        await this.homePage.movePages("Analytics")
        console.log("first, check the number of 'email sent' in analytics page")
        let countEmailClients = await this.analyticstsPage.checkEmailSentClients()
        console.log("update a client")
        await this.homePage.movePages("Actions")
        await this.actionsPage.updateCLient(inputName, inputOwner, inputEmail)
        console.log("check if the update appear in clients page")
        await this.homePage.movePages("Clients")
        await this.clientsPage.searchAndValidateClient(inputName, searchBy)
        console.log("check if the number of 'email sent' is now bigger by one, after the update")
        await this.homePage.movePages("Analytics")
        let countNewEmailClients = await this.analyticstsPage.checkEmailSentClients()
        if(countEmailClients != countNewEmailClients){
            console.log(`the test work! number of email before update: ${countEmailClients} and after update client the number of email is bigger by one: ${countNewEmailClients}`) 
        }
        else{
            console.error("ERROR: there is problem in the test")
        }
    }

    //The test add new client, update the email type, and count the new number
    async addAndUpdate(input, searchBy, FirstName, lastName, countryName, ownerName, email, inputName, ownerName2, email2){
        console.log("first count in client page how much time 'A' appear in email type")
        await this.homePage.navigateToHomePage()
        await this.homePage.movePages("Clients")
        let countEmailTypeBefore = await this.clientsPage.countingAndValidate(input, searchBy)
        console.log("add new client in action page, then update this client and give him 'A' in email type")
        await this.homePage.movePages("Actions")
        await this.actionsPage.addNewClient(FirstName, lastName, countryName, ownerName, email)
        await this.actionsPage.updateCLient(inputName, ownerName2, email2)
        console.log("count again in client page how much time 'A' appear in email type and check that the number is bigger by one")
        await this.homePage.movePages("Clients")
        let countEmailTypeAfter = await this.clientsPage.countingAndValidate(input, searchBy)
        if(countEmailTypeBefore != countEmailTypeAfter){
            console.log(`the test work! number of email before add and update client: ${countEmailTypeBefore}, and the number of email type after is bigger by one: ${countEmailTypeAfter}`)
        }
        else{
            console.error("ERROR: there is problem in the test")
        }
    }
}

let clientPageTest = new ActionPageTest();
clientPageTest.addNewClients("Adi", "Yaacobi", "Sweden", "MartinMassey", "lululemon@lulu.com", "Adi yaacobi", "Name")
clientPageTest.updateClients("Adi Yaacobi", "Walter White", "b", "Name")
clientPageTest.addAndUpdate( "A", "Email Type", "Adi", "Yaacobi", "Sweden", "MartinMassey", "lululemon@lulu.com", "Adi Yaacobi", "MartinMassey", "A",  "A", "Email Type")