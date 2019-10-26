class AnalyticstsPage{
    constructor(selenium) {
        this.selenium = selenium
        }
    
    async navigateToAnalyticsPage() {
            await this.selenium.getURL("https://lh-crm.herokuapp.com/analytics")
    }

    //check the number of 'outstanding clients' - client who get "NO" sold in client page
    async checkOutstandingClients(){
        try {
         
        let arrNumber = []
        let getText = await this.selenium.findElementListBy("css", "div[class='badge-val'][style='color: rgb(85, 81, 81);']")
        for(let i of getText){
            await this.selenium.sleep(3000)
            let x = await this.selenium.getTextFromElement("css", ".badge-val div:nth-child(3)", i)
            arrNumber.push(x)
        }
        let success = arrNumber[2]
        console.log(`The number of outstanding clients in analytics page: ${arrNumber[2]}`) 
        return success
        } catch (error) {
            console.error("get error while try to check outstandindg client numbers")
        }
        return false
    }    
    
    //The function check if client have any type of email -A/B/C/D, and get the number of all of them
    async checkEmailSentClients(){
        try {
         
        let arrNumber = []
        let getText = await this.selenium.findElementListBy("css", "div[class='badge-val'][style='color: rgb(85, 81, 81);']")
        for(let i of getText){
            await this.selenium.sleep(3000)
            let x = await this.selenium.getTextFromElement("css", ".badge-val div:nth-child(3)", i)
            arrNumber.push(x)
        }
        let success = arrNumber[1]
        console.log(`The number of email clients sents in analytics page: ${arrNumber[1]}`)
        return success
        } catch (error) {
            console.error("get error while try to check email sent numbers")
        }
        return error
    }         

    //The function check the 'hottest country' - the country that most clients belong to and get the name of this country
    async checkHottestCountry(){
        try {
        
        let arrNumber = []
        let getText = await this.selenium.findElementListBy("css", "div[class='badge-val'][style='color: rgb(85, 81, 81);']")
        for(let i of getText){
            await this.selenium.sleep(3000)
            let x = await this.selenium.getTextFromElement("css", ".badge-val div:nth-child(3)", i)
            arrNumber.push(x)
        }
        let success = arrNumber[3]
        console.log(`The name of the 'hottest country' in analytics page: ${arrNumber[3]}`)
        return success
        } catch (error) {
            console.error("get error while try to check biggest country numbers")
        }    
        return error
    }
}

module.exports = AnalyticstsPage
