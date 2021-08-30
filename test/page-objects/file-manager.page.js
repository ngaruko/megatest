const Page=require('./page');
class FileManagerPage extends Page {
    /**
     * define selectors using getter methods
     */
    get dialogContainer() { return $('.mega-dialog-container') }
    get body() { return $('#bodyel') }
    get fileName() { return $('[name="dialog-new-file"]') }
    get fileCreateButton() { return $('.fm-dialog-new-file-button') }
    get textEditorContainer() { return $('section.text-editor-container') }
    get fileEditorTextArea() { return $('div textarea') }
    get saveButton() { return $('.mega-button.positive.gradient.save-btn') }
    get fileSettingsIcon() { return $('span.file-settings-icon') }
    get removeButton() { return $('a.dropdown-item.remove-item') }
    get confirmButton() { return $('.mega-button.positive.confirm') }
    get rubbishBinButton() { return $('[data-link="bin"]') }
    get fileContextMenu() { return $('a.grid-url-arrow') }
    get restoreButton() { return $('a.dropdown-item.revert-item') }
    get cloudDriveLink() { return $('i.sprite-fm-mono.icon-cloud-drive') }//clicking on some part of > does not open the drive
    get mainView() { return $('div.fm-blocks-view.fm') }
    get deletedFileRow() { return $('.time.ad') }
    get emptyBinMessage() { return $('div.fm-empty-cloud-txt') }
    get itemMoveLink() { return $('a.dropdown-item.move-item.contains-submenu.sprite-fm-mono-after.icon-arrow-right-after') }
    get moveButton() { return $('button.mega-button.positive.dialog-picker-button.active') }



    async open() {
        await super.open('fm');
        await this.listContent.waitForDisplayed();
    }

    async openRubbishBin() {
        await this.rubbishBinButton.waitForDisplayed();
        return await this.rubbishBinButton.click();
    }

    async restoreFile(fileElement) {
        await this.openRubbishBin();
        await this.deletedFileRow.click();
        await this.fileContextMenu.click();
        try { //this context is sometimes different, maybe depending on the time the file has been deleted
            await this.restoreButton.click();
        } catch (error) {
            this.itemMoveLink.click();
            await browser.pause(1000);
            this.moveButton.click();
        }

        await fileElement.waitForDisplayed({ reverse: true });
    }
}

module.exports=new FileManagerPage();