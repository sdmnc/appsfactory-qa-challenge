class CheckoutPage {
    async isAtRegistration() {
        const url = await browser.getUrl();
        return url.includes('/ap/register') || url.includes('/ap/signin');
    }
}

export default new CheckoutPage();