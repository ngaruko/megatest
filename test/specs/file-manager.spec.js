const LoginPage=require('../page-objects/login.page');
const FileManagerPage=require('../page-objects/file-manager.page');
const utils=require('../utils');
var chai=require('chai');
chai.use(require('chai-string'));
//const {WebTable} = require('../page-objects/webTable')

const fileName='a.txt';
let fileElement;

describe('File Management Tests', () => {
	before('set filename element', async () => {
		await FileManagerPage.mainView.waitForDisplayed();
		fileElement=await $(`[title="${fileName}"]`);
	})

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
		await FileManagerPage.rubbishBinButton.waitForDisplay();
		await FileManagerPage.rubbishBinButton.click();
		await $('.time.ad').waitForDisplayed();
		await $('.time.ad').click();
		await FileManagerPage.fileContextMenu.click();
		await FileManagerPage.restoreButton.click();

		const emptyBinMessage = await FileManagerPage.emptyBinMessage.getText();
		expect(await emptyBinMessage).to.equal('Empty Cloud Drive');
		await FileManagerPage.cloudDriveLink.waitForDisplayed();
		await FileManagerPage.cloudDriveLink.click();
		await utils.expectElement(fileElement, true);
	});
});