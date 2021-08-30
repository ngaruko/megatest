const DownloadPage=require('../page-objects/downloads.page');
var chai=require('chai');
const constants=require('../constants');
chai.use(require('chai-string'));

describe('Distros Downloads Tests', () => {
	before('should go to download page', async () => {
		await DownloadPage.open();
	});

	it('check that all distros are downloadable', async () => {
		const distros=await DownloadPage.getDistros();
		await browser.refresh();
		await DownloadPage.linuxButton.waitForDisplayed();
		await DownloadPage.linuxButton.click();
		for (let distro of distros) {
			const [ dataLink, installationGuide ]=await DownloadPage.select(distro);
			//expect datalink
			chai.expect(dataLink).to.startWith(`${constants.BASE_URL}linux/MEGAsync/`);
			//expect installation guide
			try {
				chai.expect(installationGuide).to.startWith('sudo');
			} catch (error) {
				chai.expect(installationGuide).to.equal('pacman -U');
			}
			//expect download button enabled
			chai.expect(await DownloadPage.downloadButton.isExisting()).to.be.true;
		}
	});

});