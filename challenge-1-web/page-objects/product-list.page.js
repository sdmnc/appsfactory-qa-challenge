class ProductListPage {
    get sortDropdown() { return $('#s-result-sort-select'); }

    async sortByPriceLowToHigh() {
        console.log('⏳ Sorting by price...');
        await this.sortDropdown.waitForExist({ timeout: 10000 });
        await this.sortDropdown.selectByVisibleText('Price: Low to High');

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('price-asc-rank'),
            {
                timeout: 10000,
                timeoutMsg: 'URL did not change after sorting'
            }
        );
        await browser.pause(2000);
    }

    async addCheapestToBasket(product) {
        await $('.a-price').waitForExist({ timeout: 10000 });

        // Find all product cards
        const products = await $$("div.s-result-item[data-asin]");
        let cheapest = null;
        let cheapestPrice = Number.POSITIVE_INFINITY;

        for (const item of products) {
            // Find product title element
            let titleElem = await item.$('h2 a, a.a-link-normal.a-text-normal');
            if (!(await titleElem.isExisting())) continue;
            const titleText = (await titleElem.getText()).toLowerCase();
            if (!titleText.includes(product.toLowerCase())) continue;

            // Find price
            const priceWhole = await item.$('.a-price-whole');
            const priceFraction = await item.$('.a-price-fraction');
            if (!(await priceWhole.isExisting() && await priceFraction.isExisting())) continue;
            const wholeText = await priceWhole.getText();
            const fractionText = await priceFraction.getText();
            let price = parseFloat(
                wholeText.replace(/[^0-9]/g, '') + '.' +
                fractionText.replace(/[^0-9]/g, '')
            );
            if (price < cheapestPrice) {
                cheapest = { item, titleElem, price };
                cheapestPrice = price;
            }
        }

        if (!cheapest) {
            throw new Error(`Could not find a valid product with price for: ${product}`);
        }

        // Scroll to product title (center) and click
        await cheapest.titleElem.scrollIntoView({ block: 'center' });
        await cheapest.titleElem.waitForClickable({ timeout: 7000 });
        await cheapest.titleElem.click();

        // Wait for Add to Cart button and click
        const addToCartBtn = await $('#add-to-cart-button');
        await addToCartBtn.waitForDisplayed({ timeout: 10000 });
        await addToCartBtn.click();

        // Handle overlays/popups after Add to Cart
        // 1. Side Sheet (Smart Wagon)
        const sideSheetClose = await $('#attach-close_sideSheet-link');
        if (await sideSheetClose.isDisplayed()) {
            await sideSheetClose.click();
            await sideSheetClose.waitForDisplayed({ reverse: true, timeout: 7000 });
        }
        // 2. "No Thanks" coverage popup
        const noThanksBtn = await $('#siNoCoverage-announce');
        if (await noThanksBtn.isDisplayed()) {
            await noThanksBtn.click();
            await noThanksBtn.waitForDisplayed({ reverse: true, timeout: 7000 });
        }

        // Wait for overlays to disappear
        await browser.waitUntil(async () => {
            return !(await sideSheetClose.isDisplayed()) && !(await noThanksBtn.isDisplayed());
        }, { timeout: 7000, timeoutMsg: 'Overlay did not disappear' });

        return cheapest.price;
    }
}

export default new ProductListPage();