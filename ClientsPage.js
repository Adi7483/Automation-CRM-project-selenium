class ClientsPage {
    constructor(selenium) {
        this.selenium = selenium
        }
    
    async navigateToClientsPage() {
        await this.selenium.getURL("https://lh-crm.herokuapp.com/client")
        }
        
    //The function insert first & last name and search the result name in the client page
    async searchAndValidateClient(input, searchBy){
        try {
        //insert an input into the search  
        await this.selenium.sleep(2000)
        await this.selenium.write(input, "css", ".search-clients input:nth-child(1)")
        await this.selenium.write(searchBy, "className", "select-css")        
        //check if there is any result in client search
        let findClient = await this.selenium.isElementExists("className", "clientDetails")
        //if true, find all the result & take the text from each one
        let arrResultName = []
        if(findClient){
            let findResult = await this.selenium.findElementListBy("className", "clientDetails")
            for(let i of findResult){
                let getTextResult = await this.selenium.getTextFromElement("className", "clientDetails", i)
                //the result is one long string, so get only specific text, in this case only first and last name
                let getTextSpecific = getTextResult.split(' ').slice(0,2).join(' ')
                //push the text into array
                arrResultName.push(getTextSpecific)   
            }
        }
        //check if the text in the result is the same text in the input was insert
        let flag = true
        for(let x = 0; x < arrResultName.length -1; x++){
            if(arrResultName[x] == input){
                flag = true
            }
            else{
                flag = false
            }
        }
        //if all the result is the same as the input, return true, else return false
        if (flag == true){
            console.log(`ALL the result in page:${arrResultName} are the same as the input was insert: ${input}`)
            return true
        }
        else{
            console.error(`NOT all the result in page:${arrResultName} are the same as the input was insert: ${input}`)
            return false
        }
        } catch (error) {
            console.error(`get error while try to search and validate: ${input}`)
        }
        return false
    }

    //The function check if email type that was insert is the same as the result  
    async searchAndValidateClientDetais(input, searchBy, inputEmail){
        try {
        //insert an input into the search  
        await this.selenium.sleep(2000)
        await this.selenium.write(input, "css", ".search-clients input:nth-child(1)")
        await this.selenium.write(searchBy, "className", "select-css")  
               
        //check if there is any result in client search
        let findClient = await this.selenium.isElementExists("className", "clientDetails")
        if(findClient){
            //get the text from email type
            let emailType = await this.selenium.getTextFromElement("css", ".clientDetails th:nth-child(8)")
            //check if the result is the same as the input
            if(emailType == inputEmail){
                return true
            }
            else{
                return false
            }
        }
        else{
            console.log("There is no result in the page")
            }
        } catch (error) {
            console.error(`get error while try to search and validate: ${input}`)
        }
    }

    //The function click on specific client and update his details
    async clickOnClientAndUpdate(input, searchBy, updateName){
        try {
         
        //write an input inside the search option 
        await this.selenium.write(input, "css", ".search-clients input:nth-child(1)")
        await this.selenium.write(searchBy, "className", "select-css")  
                   
        //check client result
        let findClient = await this.selenium.isElementExists("className", "clientDetails")
        if(findClient){
            let findName = await this.selenium.getTextFromElement("css", ".clientDetails th:nth-child(1)")
            if(input == findName.toLowerCase()){
                await this.selenium.clickElement("css", ".clientDetails th:nth-child(1)")
            }
            else{
                console.log("cant click on this client")
                } 
            }
        else{
            console.log("ERROR: with this details there are no such client")
            }

        //clear the current name
        await this.selenium.clearElementField("css", "input[id='name']")

        //insert new name
        await this.selenium.write(updateName, "css", "input[id='name']") 
                    
        //update the new name
        await this.selenium.clickElement("className", "update-client-popup-btn")

        //quit and move to the main page with client list
        await this.selenium.clickElement("className", "cancel-client-popup-btn")

        //check the pop up and get the text after click update
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

        //clear the search input
        await this.selenium.sleep(2000)
        await this.selenium.clearElementField("css", `input[type='text'][value='${input}']`)
        
        //insert the new name
        await this.selenium.write(updateName, "css", ".search-clients input:nth-child(1)")
        await this.selenium.write(searchBy, "className", "select-css")  

        //check if the new name exist
        let isNewNameExist = await this.selenium.isElementExists("className", "clientDetails")
        let findNewName = await this.selenium.getTextFromElement("css", ".clientDetails th:nth-child(1)")
        findNewName = findNewName.toLowerCase()
            //check if the new name after the update is exist 
            if(isNewNameExist && updateName == findNewName){
            console.log(`success! the new input was insert after the update: ${updateName}, is the same as the result: ${findNewName}`)
            return true
        }
        else{
            console.log("ERROR: with this details there are no such client")
            return false
            }
        
        } catch (error) {
            console.error("get error while try to click and update a client")
        }
    }
            
    //The function is counting the number of a specific word that insert and validate it
    async countingAndValidate(input, searchBy){
        try {
        await this.selenium.write(input, "css", ".search-clients input:nth-child(1)")
        await this.selenium.write(searchBy, "className", "select-css")  

        //check the result, get the first and last page of the result
        let sum = 0
        let firstPage = await this.selenium.getTextFromElement("css", ".page-numbers span:nth-child(2)")
        console.log(`first page: ${firstPage}`)
        let lastPage = await this.selenium.getTextFromElement("css", ".page-numbers span:nth-child(4)")
        console.log(`last Page: ${lastPage}`)

        //check after the search. if element exist get the text
        let checkResualt = await this.selenium.isElementExists("className", "clientDetails")
        let countingPages = 0
        while(checkResualt == true && countingPages < lastPage){
            let findword = await this.selenium.findElementListBy("className", "clientDetails")
                    for(let i of findword){
                        let getTextSold = await this.selenium.getTextFromElement("className", "clientDetails", i)
                        sum = sum +1
         }
         await this.selenium.clickElement("css", "img[name='next']") 
         countingPages++
        }
        console.log(`counting the word: ${input}, in client page, the number of time its appear: ${sum}`)  
       
        console.log("success to count and validate")
            return sum
        } catch (error) {
            console.error("get error while try to count and validate")
            return false
        }
    }

        //The function counting result of email type, the function get the specific option to insert
        async countingEmailType(searchBy){
            try {
            //email type option
            let input = ["A", "B", "C", "D"] 
            let sum = 0
            for(let inputCounting of input){
                await this.selenium.write(inputCounting, "css", ".search-clients input:nth-child(1)")
                await this.selenium.write(searchBy, "className", "select-css")  
    
            //check the result, get the first and last page of the result
            let firstPage = await this.selenium.getTextFromElement("css", ".page-numbers span:nth-child(2)")
            console.log(`first page: ${firstPage}`)
            let lastPage = await this.selenium.getTextFromElement("css", ".page-numbers span:nth-child(4)")
            console.log(`last Page: ${lastPage}`)
            
            //check if element exist, get the text and count the time of every element in the array is appear
            let checkResualt = await this.selenium.isElementExists("className", "clientDetails")
            let countingPages = 0
            while(checkResualt == true && countingPages < lastPage){
                let findword = await this.selenium.findElementListBy("className", "clientDetails")
                    for(let i of findword){
                        await this.selenium.getTextFromElement("className", "clientDetails", i)
                        sum = sum + 1
                    }
                await this.selenium.clickElement("css", "img[name='next']") 
                countingPages++
                await this.selenium.sleep(2000)
                await this.selenium.clearElementField("css", `input[type='text'][value='${inputCounting}']`)
            }
            console.log(`counting the word: ${input}, in client page, the number of time its appear: ${sum}`)
            } 
            console.log("success to counting email type")
            return sum
            } catch (error) {
                console.error("get error while try to counting email type")
            }  
            return false
        }  
        
        //The function counting all the country in the client page, insert them to an array and check which country appear most opften
        async countingCountry(searchBy){
            try {
             
            //insert an empty input to get all the country
            let input = [""]
            let sum = 0
            let arrayOfCountry = []
            //search all the country 
            for(let inputCounting of input){
                await this.selenium.write(inputCounting, "css", ".search-clients input:nth-child(1)")
                await this.selenium.write(searchBy, "className", "select-css")  
    
                //counting the country result until the last page         
                let lastPage = await this.selenium.getTextFromElement("css", ".page-numbers span:nth-child(4)")
                let checkResualt = await this.selenium.isElementExists("className", "clientDetails")
                let countingPages = 0
                //while there is result and there is pages to move, the loop will get the name of the country and push it to array
                while(checkResualt == true && countingPages < lastPage){
                    let findCountry = await this.selenium.findElementListBy("css", ".clientDetails th:nth-child(3)")
                    for(let i of findCountry){
                    let getText = await this.selenium.getTextFromElement("css", ".clientDetails th:nth-child(3)", i)
                        sum = sum + 1 
                        arrayOfCountry.push(getText)
                    }
                    await this.selenium.clickElement("css", "img[name='next']") 
                    countingPages++
                    await this.selenium.sleep(2000)
                }
                console.log(`counting all the country in client page, the number of all country that appear: ${sum}`)
            }

            //check how much time each country appear and print the country which appear the most time
            let max = 1;
            let counter = 0;
            let item;
            for (let i = 0; i < arrayOfCountry.length; i++) {
                for (let j = i; j < arrayOfCountry.length; j++) {
                    if (arrayOfCountry[i] == arrayOfCountry[j])
                        counter++;
                        if (max < counter) {
                        max = counter;
                        item = arrayOfCountry[i];
                }
            
            }
            counter = 0;
        
    }
        console.log(item + "(" + max + "times)");
        
        
            console.log("get success while try to count and check the biggest country")
            return item
        }
             catch (error) {
               console.error("get error while try to count and check the bigeest country") 
             }
        }
    }
     
module.exports = ClientsPage

