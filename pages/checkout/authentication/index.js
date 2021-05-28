// Import checkout index page
const CheckoutConfigurationPage = require('@pages/checkout/index.js');

class PS_CHECKOUT_AUTHENTICATION extends CheckoutConfigurationPage.constructor {
  constructor() {
    super();

    // Selectors

    // Block if the account is logged out
    this.loginToPSCheckoutLink = '#go-to-signin-link';
    this.signupToPSCheckoutLink = '#go-to-signup-link';

    // Block if the user is logged in
    this.logourFromPsCheckoutLink = '#psx-logout-button';
    // Confirm modal
    this.psxLogoutModal = '#psxModalLogout';
    this.confirmLogoutModalButton = '#modal-confirm-logout-button';

    // Cards selectors
    this.loginFormCard = '#login-form-card';
    this.signupFormCard = '#signup-form-card';
    this.additionalFormCard = '#additional-information-form-card';

    // Paypal block selectors
    this.linkToPaypalAccountButton = '#link-to-paypal-account-button';
    this.unlinkPaypalAccountButton = '#paypal-unlink-button';
    this.paypalPopupEmailInput = '#email';
  }

  // Functions

  // Forms visible functions
  /**
   * Check if login form is visible
   * @param page {Page} Browser tab
   * @param timeout {number} Time to wait for the form to be visible
   * @returns {Promise<boolean>}
   */
  loginFormVisible(page, timeout = 10000) {
    return this.elementVisible(page, this.loginFormCard, timeout);
  }

  /**
   * Check if signup form is visible
   * @param page {Page} Browser tab
   * @param timeout {number} Time to wait for the form to be visible
   * @returns {Promise<boolean>}
   */
  signupFormVisible(page, timeout = 10000) {
    return this.elementVisible(page, this.signupFormCard, timeout);
  }

  /**
   * Check if additional information form is visible
   * @param page {Page} Browser tab
   * @param timeout {number} Time to wait for the form to be visible
   * @returns {Promise<boolean>}
   */
  additionalFormVisible(page, timeout = 10000) {
    return this.elementVisible(page, this.additionalFormCard, timeout);
  }

  // Check Login functions

  /**
   * Check if account is logged in
   * @param page {Page} Browser tab
   * @param timeout {number} Maximum time to wait for element to be visible
   * @returns {Promise<boolean>}
   */
  psxLoggedIn(page, timeout = 10000) {
    return this.elementVisible(page, this.logourFromPsCheckoutLink, timeout);
  }

  /**
   * Check if paypal account is logged in
   * @param page {Page} Browser tab
   * @param timeout {number} Maximum time to wait for element to be visible
   * @returns {Promise<boolean>}
   */
  async paypalLoggedIn(page, timeout = 30000) {
    await page.waitForNavigation('networkidle', {timeout});

    return this.elementVisible(page, this.unlinkPaypalAccountButton, timeout);
  }

  // Go to Forms functions

  /**
   * Fo to signup form
   * @param page
   * @returns {Promise<boolean>}
   */
  async goToPsxSignUpForm(page) {
    await page.click(this.signupToPSCheckoutLink);
    return this.signupFormVisible(page);
  }

  /**
   * Go to login form
   * @param page {Page} Browser tab
   * @returns {Promise<boolean>}
   */
  async goToPsxLoginForm(page) {
    await page.click(this.loginToPSCheckoutLink);
    return this.loginFormVisible(page);
  }

  /**
   * Logout from Psx account
   * @param page {Page} Browser tab
   * @returns {Promise<boolean>}
   */
  async logoutPsxAccount(page) {
    // Click on log out and wait for confirm modal
    await page.click(this.logourFromPsCheckoutLink);
    await this.waitForVisibleSelector(page, this.psxLogoutModal);

    // Confirm delete with modal
    await Promise.all([
      page.click(this.confirmLogoutModalButton),
      this.waitForHiddenSelector(page, this.psxLogoutModal),
    ]);

    // Return user status
    return this.loginFormVisible(page);
  }

  /**
   * Open paypal popup to login
   * @param page {Page} Browser tab
   * @returns {Promise<Page>} Popup opened from paypal
   */
  openPaypalLoginPopup(page) {
    return this.openLinkWithTargetBlank(page, this.linkToPaypalAccountButton, this.paypalPopupEmailInput);
  }
}

module.exports = new PS_CHECKOUT_AUTHENTICATION();
