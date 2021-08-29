const Page=require('./page');

class DownloadPage extends Page {
	/**
	 * define selectors using getter methods
	 */
	get linuxButton() { return $('.pages-nav.nav-button.transition.linux') }
	get versionSelectionDropdown() { return $('.mega-input.dropdown-input.box-style.inline.megasync-dropdown') }
	get distrosOptions() { return $$('.option') }
	get downloadButton() { return $('button.mega-button.positive.transition.megaapp-linux-download.download') }
	get intallationGuide() { return $('div.install-guide-text span.install-guide') }
	get copyIcon() { return $('small-icon.icons-sprite.copy-line-icon.transition') }

	async getDistros() {
		await this.linuxButton.waitForDisplayed();
		await this.linuxButton.click();
		await this.versionSelectionDropdown.click();
		return await $$('.dropdown-scroll.ps-container.ps-theme-default.ps-active-y div.option').map(async (result) => {
			return result.getText();
		});
	}

	async select(distro) {
		await this.versionSelectionDropdown.click();
		const dist=await $(`[data-client="${distro}"]`);
		await dist.scrollIntoView();
		const dataLink=await dist.getAttribute('data-link');
		await dist.click();
		const installationGuide=await this.intallationGuide.getText();
		await browser.pause(1000);
		return [ dataLink, installationGuide ];
	}

	async open() {
		return await super.open('sync');
	}
}

module.exports=new DownloadPage();