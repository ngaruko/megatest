const LoginPage=require('../page-objects/login.page');
const FileManagerPage=require('../page-objects/file-manager.page');
const utils = require('../utils');
var chai=require('chai');
chai.use(require('chai-string'));


describe('File Management Tests', () => {
	before('set filename element', async () => {
		const fileName='a.txt';
		const fileElement=await $(`[title="${fileName}"]`);
	})

	it('should create a file', async () => {
		browser.execute('createFileDialog();');
		await FileManagerPage.fileName.setValue(file);
		await FileManagerPage.fileCreateButton.click();
		await FileManagerPage.textEditorContainer.waitForDisplayed();
		await FileManagerPage.fileEditorTextArea.addValue('megatesting');
		await FileManagerPage.saveButton.click();
		await utils.expect(fileElement, true);
	});

	it('should delete the file', async () => {
		await FileManagerPage.fileSettingsIcon.waitForDisplayed();
		await FileManagerPage.fileSettingsIcon.click();
		await FileManagerPage.removeButton.click();
		await FileManagerPage.confirmButton.click();
		await utils.expectElement(fileElement, false);
	});

	it('should restore file from rubbish bin', async () => {
		await FileManagerPage.rubbishBinButton.click();
		await FileManagerPage.fileContextMenu.click();
		await FileManagerPage.restoreButton.click();
		await FileManagerPage.cloudDriveLink.waitForDisplayed();
		await FileManagerPage.cloudDriveLink.click();
		await utils.expect(fileElement, true);
	});
});