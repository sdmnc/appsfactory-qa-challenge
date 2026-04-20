class CartPage {
    get cartButton() { return $('#nav-cart'); }

    async open() {
        await browser.url('https://www.amazon.com/gp/cart/view.html');
    }

    async getCartItems() {
        const products = await $$('.sc-list-item-content');
        return products.map(async (item) => {
            const titleElem = await item.$('.sc-product-title, .a-truncate-full');

            if (await titleElem.isExisting()) {
                return (await titleElem.getText()).trim().toLowerCase();
            }
            return '';
        });
    }

    async hasProduct(productName) {
        const items = await this.getCartItems();
        return items.some(text => text.includes(productName.toLowerCase()));
    }

    async getCartTotal() {
        const totalEl = await $('#sc-subtotal-amount-activecart span');
        let txt = await totalEl.getText();
        txt = txt.replace(/[^0-9\.,]/g, '').replace(',', '.');
        return parseFloat(txt);
    }

    async proceedToCheckout() {
        const checkoutBtn = await $('[name="proceedToRetailCheckout"]');

        await checkoutBtn.waitForExist({ timeout: 10000 });
        await checkoutBtn.scrollIntoView();
        await browser.execute((el) => el.click(), checkoutBtn);
    }
}

export default new CartPage();