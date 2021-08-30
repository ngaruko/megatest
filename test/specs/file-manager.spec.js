const FileManagerPage=require('../page-objects/file-manager.page');
//const LoginPage=require('../page-objects/login.page');
const utils=require('../utils');
const {expect}=require('chai');
const fileName='a.txt';
let fileElement;

describe('File Management Tests', () => {
	before('set filename element', async () => {
		//await LoginPage.login();
		await browser.pause(10000)
		await FileManagerPage.open();
		fileElement=await $(`[title="${fileName}"]`);
	});

	it('should create a file', async () => {
		await browser.execute('createFileDialog();');
		await FileManagerPage.fileName.setValue(fileName);
		await FileManagerPage.fileCreateButton.click();
		await FileManagerPage.textEditorContainer.waitForDisplayed();
		await FileManagerPage.fileEditorTextArea.addValue('megatesting');
		await FileManagerPage.saveButton.click();
		await browser.refresh();
		await fileElement.waitForDisplayed();
		await utils.expectElement(fileElement, true);
	});

	it('should delete the file', async () => {
		await fileElement.click();
		await FileManagerPage.fileSettingsIcon.click();
		await FileManagerPage.removeButton.click();
		await FileManagerPage.confirmButton.click();
		await browser.refresh();
		await utils.expectElement(fileElement, false);
	});

	it('should restore file from rubbish bin', async () => {
		await FileManagerPage.restoreFile(fileElement)
		expect(await FileManagerPage.emptyBinMessage.getText()).to.equal('Empty Cloud Drive');
	});

	it('check that file was restored', async () => {
		await FileManagerPage.open();
		await FileManagerPage.listContent.waitForDisplayed();
		await utils.expectElement(fileElement, true);
	});
});