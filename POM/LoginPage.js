class LoginPage {

    constructor(page){

        this.page = page;
        this.userName= page.locator("#userEmail");
        this.passWord = page.locator("#userPassword");
        this.loginBtn= page.locator("[value='Login']");
    }

   async goTO(){
    await this.page.goto("https://rahulshettyacademy.com/client");
    }
    async  validLogin(username,password){
        await this.userName.fill(username);
        await this.passWord.fill(password);
        await this.loginBtn.click();
        await this.page.waitForLoadState('networkidle');
     }
}
module.exports={LoginPage};