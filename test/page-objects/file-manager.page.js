const Page = require('./page');
class FileManagerPage extends Page {
    /**
     * define selectors using getter methods
     */
    get dialogContainer() { return $('.mega-dialog-container') }
    get body() { return $('#bodyel') }
    get fileName() { return $('[name="dialog-new-file"]') };
    get fileCreateButton() { return $('.fm-dialog-new-file-button') };
    get textEditorContainer() { return $('section.text-editor-container') }
    get fileEditorTextArea() { return $('div textarea') }
    get saveButton() { return $('.mega-button.positive.gradient.save-btn') }
    get fileSettingsIcon() { return $('span.file-settings-icon') }
    get removeButton() { return $('a.dropdown-item.remove-item') }
    get confirmButton() { return $('.mega-button.positive.confirm') }
    get rubbishBinButton() { return $('.btn-myfiles.js-lpbtn.rubbish-bin.js-fm-tab.ui-droppable.filled') }
    get fileContextMenu() { return $('a.grid-url-arrow') }
    get restoreButton() { return $('a.dropdown-item.revert-item') }
    get cloudDriveLink() { return $('.btn-myfiles.js-lpbtn.js-clouddrive-btn.cloud-drive.collapse.active') }

    async open() {
        return await super.open('');
    }
}

module.exports = new FileManagerPage();