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

});