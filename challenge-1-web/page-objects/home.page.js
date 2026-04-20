class HomePage {
    get searchInput() { return $('#twotabsearchtextbox'); }
    get searchButton() { return $('input.nav-input[type="submit"], input[type="submit"][value="Go"], input[type="submit"][aria-label="Go"]'); }

    async open() {
        await browser.url('https://www.amazon.com/');
    }

    async searchFor(text) {
        await this.searchInput.waitForDisplayed({ timeout: 16000 });
        await this.searchInput.setValue(text);
        await this.searchButton.waitForClickable({ timeout: 15000 });
        await this.searchButton.click();

        // Wait for overlays/popups to disappear after search
        const sideSheetClose = await $('#attach-close_sideSheet-link');
        const noThanksBtn = await $('#siNoCoverage-announce');
        await browser.waitUntil(async () => {
            return !(await sideSheetClose.isDisplayed()) && !(await noThanksBtn.isDisplayed());
        }, { timeout: 7000, timeoutMsg: 'Overlay did not disappear after search' });
    }
}

export default new HomePage();