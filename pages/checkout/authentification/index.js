// Import checkout index page
const CheckoutConfigurationPage = require('../index.js');

class PS_CHECKOUT_AUTHENTICATION extends CheckoutConfigurationPage.constructor {
  constructor() {
    super();

    // Selectors

    // PrestaShop checkout account logged out block
    this.loginToPSCheckoutLink = '#go-to-signin-link';
    this.signupToPSCheckoutLink = '#go-to-signup-link';

    // Cards selectors
    this.loginFormCard = '#login-form-card';
    this.signupFormCard = '#signup-form-card';
    this.additionalFormCard = '#additional-information-form-card';
  }

  // Functions

  /**
   * Check if login form is visible
   * @param page {Page} Browser tab
   * @param timeout {number} Time to wait for the form to be visible
   * @returns {Promise<boolean>}
   */
  isLoginFormVisible(page, timeout = 10000) {
    return this.elementVisible(page, this.loginFormCard, timeout);
  }

  /**
   * Check if signup form is visible
   * @param page {Page} Browser tab
   * @param timeout {number} Time to wait for the form to be visible
   * @returns {Promise<boolean>}
   */
  isSignupFormVisible(page, timeout = 10000) {
    return this.elementVisible(page, this.signupFormCard, timeout);
  }

  /**
   * Check if additional information form is visible
   * @param page {Page} Browser tab
   * @param timeout {number} Time to wait for the form to be visible
   * @returns {Promise<boolean>}
   */
  isAdditionalFormVisible(page, timeout = 10000) {
    return this.elementVisible(page, this.additionalFormCard, timeout);
  }

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
   * @returns {Promise<boolean>}
   */
  async goToPsxLoginForm(page) {
    await page.click(this.loginToPSCheckoutLink);
    return this.isLoginFormVisible(page);
  }
}

module.exports = new PS_CHECKOUT_AUTHENTICATION();
