class ActionsPage{
    constructor(selenium) {
        this.selenium = selenium
        }
    
        async navigateToActionsPage() {
            await this.selenium.getURL("https://lh-crm.herokuapp.com/actions")
        }

        //The function update an exist client
        async updateCLient(name, owner, emailType){
            try {

            await this.selenium.sleep(2000)

            //insert name of client
            await this.selenium.write(name, "css", "input[list='names']")

            //insert owner 
            await this.selenium.write(owner, "css", "input[list='owner']")
            await this.selenium.clickElement("css", "input[type='button'][value='Transfer']")

            //insert email type
            await this.selenium.write(emailType, "css", "input[list='emailType']")
            await this.selenium.clickElement("css", "input[type='button'][value='Send']")

            //click on 'sold' button
            await this.selenium.clickElement("css", "input[type='button'][value='Sold']")
            
            //check the pop up and get the text
            let findPopUpSuccess = await this.selenium.isElementExists("css", ".success-pop-up")
            let findPopUpError = await this.selenium.isElementExists("css", ".error-pop-up")
            if(findPopUpSuccess){
                let getPopUpSuccess = await this.selenium.getTextFromElement("css", ".success-pop-up")
                console.log(`The pop up message: ${getPopUpSuccess}`)
            }
            else if(findPopUpError){
                let getPopUpError = await this.selenium.getTextFromElement("css", ".error-pop-up")
                console.log(`The pop up message: ${getPopUpError}`)
            }
             console.log("success to update client") 
            } catch (error) {
                console.error("get error while try to update client")
            }
        
        }

        //The function ADD new client to the client page
        async addNewClient(firstName, lastName, country, owners, email){
            try {
             
            //insert all details: first and last name, country, owners and email
            await this.selenium.write(firstName, "id", "firstName")
            await this.selenium.write(lastName, "id", "lastName")
            await this.selenium.write(country, "id", "country")
            await this.selenium.write(owners, "css", "input[type='text'][id='owner']")
            await this.selenium.write(email, "id", "email")
            await this.selenium.clickElement("className", "add-client-btn")  

            //check the pop up after finish insert all details, and get the text of the pop up
            let findPopUpSuccess = await this.selenium.isElementExists("css", ".success-pop-up")
            let findPopUpError = await this.selenium.isElementExists("css", ".error-pop-up")
            if(findPopUpSuccess){
                let getPopUpSuccess = await this.selenium.getTextFromElement("css", ".success-pop-up")
                console.log(`The pop up message: ${getPopUpSuccess}`)
            }
            else if(findPopUpError){
                let getPopUpError = await this.selenium.getTextFromElement("css", ".error-pop-up")
                console.log(`The pop up message: ${getPopUpError}`)
            }

            console.log("success to add new client")
            } catch (error) {
                console.error("get error while try to add new client")
            }      
        }
    }

module.exports = ActionsPage