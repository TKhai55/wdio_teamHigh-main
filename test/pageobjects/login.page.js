import Page from './page.js';

class LoginPage extends Page {
    constructor(browserName) {
        super(browserName);
    }

    get inputUsername() {
        return this._browser.$(`input[name='_account']`);
    }

    get inputPassword() {
        return this._browser.$(`input[name='_password']`);
    }

    get btnSubmit() {
        return this._browser.$('.login_margin');
    }

    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    open() {
        return super.open('');
    }
}

export default LoginPage;
