// Import checkout authentication page
const CheckoutAuthenticationPage = require('index.js');

class PS_CHECKOUT_LOGIN extends CheckoutAuthenticationPage.constructor {
  constructor() {
    super();

    // Selectors

    // Prestashop checkout account login form
    this.loginFormEmailInput = '#email-input';
    this.loginFormPasswordInput = '#password-input';
    this.loginFormSubmitButton = '#login-button';
  }

  // Ps checkout account functions
  /**
   * check if login form is visible
   * @param page {Page} Browser tab
   * @returns {Promise<boolean>}
   */
  isPsxLoginFormVisible(page) {
    return this.waitForVisibleSelector(page, this.loginFormEmailInput, 2000);
  }

  /**
   * Fill psx login form
   * @param page {Page} Browser tab
   * @param psCheckoutAccount {Object} Data to login
   * @returns {Promise<void>}
   */
  async fillPsxLoginForm(page, psCheckoutAccount) {
    await this.setValue(page, this.loginFormEmailInput, psCheckoutAccount.email);
    await this.setValue(page, this.loginFormPasswordInput, psCheckoutAccount.password);
  }

  /**
   * Login to Ps checkout account
   * @param page {Page} Browser tab
   * @param psCheckoutAccount {Object} Data to login
   * @returns {Promise<void>}
   */
  async loginToPsx(page, psCheckoutAccount) {
    await this.fillPsxLoginForm(page, psCheckoutAccount);
    await page.click(this.loginFormSubmitButton);
  }
}

module.exports = new PS_CHECKOUT_LOGIN();
