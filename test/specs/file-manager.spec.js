const LoginPage = require('../pageobjects/login.page');
const FileManagerPage = require('../pageobjects/file-manager.page');
var chai = require('chai');
chai.use(require('chai-string'));
const file='a.txt'

describe('File Management Tests', () => {
	it('should create a file', async () => {
		await browser.pause(10000);
		browser.execute('createFileDialog();');
		await browser.pause(10000);
		await FileManagerPage.fileName.setValue(file);
		await FileManagerPage.fileCreateButton.click();
		await FileManagerPage.textEditorContainer.waitForDisplayed({ timeout: 30000 });
		await FileManagerPage.fileEditorTextArea.addValue('megatesting');
		await FileManagerPage.saveButton.click()
		await browser.pause(10000);;
	});

	it('should delete the file', async () => {
		await browser.pause(20000);
		await FileManagerPage.fileSettingsIcon.click();
		await browser.pause(5000);
		await FileManager.removeButton.click();
		await FileManager.confirmButton.click();
		await browser.pause(10000);

	});

	it('should restore file from rubbish bin', async () => {
		await FileManagerPage.rubbishBinButton.click();
		await FileManagerPage.fileContextMenu.click();
		await FileManagerPage.restoreButton.click();

		await browser.pause(10000);

		await FileManagerPage.cloudDriveLink.click();
		await browser.pause(5000);
		const fileName=await $(`[title="${file}"]`);
		expect(await fileName.isExisting()).to.be.true;

	});	
});