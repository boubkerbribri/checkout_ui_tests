// Import checkout index page
const CheckoutConfigurationPage = require('../index.js');

class PS_CHECKOUT_AUTHENTICATION extends CheckoutConfigurationPage.constructor {
  constructor() {
    super();

    // Selectors

    // PrestaShop checkout account logged out block
    this.loginToPSCheckoutLink = '#go-to-signin-link';
    this.signupToPSCheckoutLink = '#go-to-signup-link';
  }

  // Ps checkout account functions

  /**
   * Check if account is logged in
   * @param page {Page} Browser tab
   * @param timeout {number} Maximum time to wait for element to be visible
   * @returns {Promise<boolean>}
   */
  isPsxLoggedIn(page, timeout = 10000) {
    return this.elementNotVisible(page, this.loginToPSCheckoutLink, timeout);
  }

  /**
   * Go to login form
   * @param page {Page} Browser tab
   * @returns {Promise<void>}
   */
  async goToPsxLoginForm(page) {
    await page.click(this.loginToPSCheckoutLink);
  }
}

module.exports = new PS_CHECKOUT_AUTHENTICATION();
