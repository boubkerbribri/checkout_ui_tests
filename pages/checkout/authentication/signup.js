// Import checkout authentication page
const CheckoutAuthenticationPage = require('@pages/checkout/authentication/index.js');

class PS_CHECKOUT_SIGNUP extends CheckoutAuthenticationPage.constructor {
  constructor() {
    super();

    // Selectors

    // Prestashop checkout account signup form
    this.signupFormEmailInput = '#email-input';
    this.signupFormPasswordInput = '#password-input';
    this.termsCheckbox = '#terms';
    this.signupFormSubmitButton = '#signup-button';
  }

  // Ps checkout account functions
  /**
   * Fill psx signup form
   * @param page {Page} Browser tab
   * @param psCheckoutAccount {Object} Data to signup
   * @param acceptTerms {boolean} To accept terms of service
   * @returns {Promise<void>}
   */
  async fillPsxSignupForm(page, psCheckoutAccount, acceptTerms = true) {
    await this.setValue(page, this.signupFormEmailInput, psCheckoutAccount.email);
    await this.setValue(page, this.signupFormPasswordInput, psCheckoutAccount.password);

    if (acceptTerms) {
      // Get input parent selector
      const checkboxLabel = await page.evaluateHandle(
        /* eslint-env browser */
        sl => document.querySelector(sl).parentElement,
        this.termsCheckbox,
      );

      // Click on the left of the label
      await checkboxLabel.click({position: {x: 0, y: 0}});
    }
  }

  /**
   * Signup to Ps checkout account
   * @param page {Page} Browser tab
   * @param psCheckoutAccount {Object} Data to signup
   * @param acceptTerms {boolean} To accept terms of service
   * @returns {Promise<boolean>}
   */
  async signupToPsx(page, psCheckoutAccount, acceptTerms = true) {
    // Fill form
    await this.fillPsxSignupForm(page, psCheckoutAccount, acceptTerms);

    // Validate form
    await page.click(this.signupFormSubmitButton);

    // Check next step is displayed
    return this.additionalFormVisible(page);
  }
}

module.exports = new PS_CHECKOUT_SIGNUP();
