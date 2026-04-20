import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from 'expect';
import HomePage from '../page-objects/home.page.js';
import ProductListPage from '../page-objects/product-list.page.js';
import CartPage from '../page-objects/cart.page.js';
import CheckoutPage from '../page-objects/checkout.page.js';

let products = {};

Given('I am on the Amazon home page', async () => {
    await HomePage.open();
});

When('I search and add the cheapest {string} to the basket', async (product) => {
    await HomePage.searchFor(product);
    await ProductListPage.sortByPriceLowToHigh();
    const price = await ProductListPage.addCheapestToBasket(product);
    products[product.toLowerCase()] = price;
});

Then('the basket should contain {int} products with correct total', async (count) => {
    await CartPage.open();
    const cartItems = await CartPage.getCartItems();
    expect(cartItems.length).toBe(count);

    const expectedTotal = Object.values(products).reduce((acc, p) => acc + p, 0);
    const basketTotal = await CartPage.getCartTotal();
    expect(Math.abs(basketTotal - expectedTotal)).toBeLessThan(0.1);
});

When('I proceed to checkout', async () => {
    await CartPage.proceedToCheckout();
});

Then('I should be redirected to the registration page', async () => {
    const isReg = await CheckoutPage.isAtRegistration();
    expect(isReg).toBe(true);
});