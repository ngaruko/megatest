const Page = require('./page');
const { USERNAME, PASSWORD } = require('../constants');
class LoginPage extends Page {

    get inputUsername() { return $('#login-name2') }
    get inputPassword() { return $('#login-password2') }
    get btnSubmit() { return $('.login-button') }
    get acceptCookiesButton() { return $('.mega-button.positive.right.accept-cookies') }

    async login(username=USERNAME, password=PASSWORD) {
        await this.open('login');
        await this.acceptCookiesButton.click();
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }
    async logout() {
        await this.open('logout');
    }
}

module.exports=new LoginPage();
