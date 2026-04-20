class CartPage {
    get cartButton() { return $('#nav-cart'); }

    async open() {
        // Go to cart page via URL
        await browser.url('https://www.amazon.com/gp/cart/view.html');
    }

    // Get all product names in the cart
    async getCartItems() {
        const products = await $$('[data-name="Active Items"] .sc-list-item-content');
        return Promise.all(products.map(async item => {
            const titleElem = await item.$('span.a-truncate-full, span.sc-product-title');
            return titleElem ? (await titleElem.getText()).trim().toLowerCase() : '';
        }));
    }

    // Check for product presence in the cart by name
    async hasProduct(productName) {
        const items = await this.getCartItems();
        return items.some(text => text.includes(productName.toLowerCase()));
    }

    // Get total cart sum
    async getCartTotal() {
        const totalEl = await $('#sc-subtotal-amount-activecart span');
        let txt = await totalEl.getText();
        txt = txt.replace(/[^0-9\.,]/g, '').replace(',', '.');
        return parseFloat(txt);
    }

    // Click "Proceed to Checkout"
    async proceedToCheckout() {
        const checkoutBtn = await $('[name="proceedToRetailCheckout"]');
        await checkoutBtn.waitForClickable({ timeout: 7000 });
        await checkoutBtn.click();
    }
}

export default new CartPage();