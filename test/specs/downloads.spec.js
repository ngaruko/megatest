const LoginPage=require('../page-objects/login.page');
const FileManagerPage=require('../page-objects/file-manager.page');
const DownloadPage=require('../page-objects/downloads.page');
var chai=require('chai');
const constants=require('../constants');
chai.use(require('chai-string'));

describe('Distros Downloads Tests', () => {
	before('should go to download page', async () => {
		await DownloadPage.open();
		await DownloadPage.acceptCookies();
	});

	it('check that all distros are downloadable', async () => {
		const distros=await DownloadPage.getDistros();
		await browser.refresh();
		await DownloadPage.linuxButton.waitForDisplayed();
		await DownloadPage.linuxButton.click();
		for (let distro of distros) {
			const [ dataLink, installationGuide ]=await DownloadPage.select(distro);
			//expect datalink
			console.log(dataLink);
			console.log(installationGuide);
			chai.expect(dataLink).to.startWith(`${constants.BASE_URL}linux/MEGAsync/`);
			//expect installation guide
			if (distro!=='Arch Linux') {
				chai.expect(installationGuide).to.startWith('sudo');
				//expect download button enabled
				chai.expect(await DownloadPage.downloadButton.isExisting()).to.be.true;
			}
		};
	});

});