const constants = require('../constants');
module.exports = class Page {
    get acceptCookiesButton() { return $('.mega-button.positive.right.accept-cookies') }
    get listContent() { return $('.megaList-content') }

    async open(path) {
        return await browser.url(`${constants.BASE_URL}${path}`)
    }

    async acceptCookies() {
        await this.acceptCookiesButton.click();
    }
}