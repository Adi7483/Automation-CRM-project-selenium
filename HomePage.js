class HomePage{
    constructor(selenium) {
        this.selenium = selenium
        }
    
        async navigateToHomePage() {
                await this.selenium.getURL("https://lh-crm.herokuapp.com/")
        }
    
        async movePages(input){
            await this.selenium.clickElement("css", `input[type='button'][value='${input}']`)
        }
}

module.exports = HomePage
