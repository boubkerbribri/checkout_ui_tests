// Get resolver
const VersionSelectResolver = require('prestashop_test_lib/kernel/resolvers/versionSelectResolver');

const versionSelectResolver = new VersionSelectResolver(global.PS_VERSION);

// Import BOBasePage
const BOBasePage = versionSelectResolver.require('BO/BObasePage.js');

class POPUP_PAYPAL extends BOBasePage {
  constructor() {
    super();

    // Selectors
    this.emailInput = '#email';
    this.boardingCountryBlock = '#boardingCountry';
    this.boardingCountryTextSpan = '#boardingCountry-label-text';
    this.boadingCountryMenu = '#boardingCountry-menu';
    this.boadingCountryShowMenu = `${this.boadingCountryMenu}.Select-menu Select-menu-show`;
    this.boadingCountryHideMenu = `${this.boadingCountryMenu}.Select-menu Select-menu-hide`;
    this.boadingCountryMenuOption = 'li.Select-menu-options';
    this.continueButton = '#continueButton';

    // Login form
    this.loginFormSection = 'section#login';
    this.passwordInput = '#password';
    this.submitLoginButton = '#btnLogin';

    // Success page
    this.partnerSuccessStatusBlock = 'div.partnerStatusSuccess';
    this.returnToPsxPageButton = 'a.Button';
  }

  // Functions

  /**
   * Check if login form is displayed
   * @param page {Page} Browser tab or popup or popup
   * @param timeout {number} Time to wait for login form to be displayed
   * @returns {Promise<boolean>}
   */
  loginFormVisible(page, timeout = 20000) {
    return this.elementVisible(page, this.loginFormSection, timeout);
  }

  /**
   * Check if login succeeded
   * @param page {Page} Browser tab or popup or popup
   * @param timeout {number} Time to wait for block success to be displayed
   * @returns {Promise<boolean>}
   */
  loginSucceeded(page, timeout = 40000) {
    return this.elementVisible(page, this.partnerSuccessStatusBlock, timeout);
  }

  // First Form page

  /**
   * Get selected country in first form
   * @param page {Page} Browser tab or popup
   * @returns {Promise<string>}
   */
  getSelectedCountry(page) {
    return this.getTextContent(page, this.boardingCountryTextSpan);
  }

  /**
   * Select country from list
   * @param page {Page} Browser tab or popup
   * @param country {string} Country to select
   * @returns {Promise<void>}
   */
  async selectCountry(page, country) {
    // Open the the country menu
    await Promise.all([
      page.click(this.boardingCountryBlock),
      this.waitForVisibleSelector(page, this.boadingCountryShowMenu),
    ]);

    // Get all countries options
    const countriesElements = await page.$$(this.boadingCountryMenuOption);

    // Select the country from list if found
    let countryFound = false;

    for (let i = 0; i < countriesElements.length; i++) {
      if (country === (await countriesElements[i].textContent())) {
        await countriesElements[i].click();
        countryFound = true;
        break;
      }
    }

    if (!countryFound) {
      throw new Error(`${country} was not found as a country`);
    }
  }

  /**
   * Fill first part of paypal form
   * @param page {Page} Browser tab or popup
   * @param paypalAccount {Object} Contain information to fill the form
   * @returns {Promise<void>}
   */
  async fillEmailAndCountryForm(page, paypalAccount) {
    await this.setValue(page, this.emailInput, paypalAccount.email);

    // Select the country
    if (paypalAccount.country !== (await this.getSelectedCountry(page))) {
      await this.selectCountry(page, paypalAccount.country);
    }
  }

  /**
   * Fill and submit Email and country form
   * @param page {Page} Browser tab or popup
   * @param paypalAccount {Object} Contain information to fill the form
   * @returns {Promise<boolean>}
   */
  async fillAndSubmitEmailAndCountryForm(page, paypalAccount) {
    // Fill the form
    await this.fillEmailAndCountryForm(page, paypalAccount);

    // Submit form
    await page.click(this.continueButton);

    // Check if login form is visible
    return this.loginFormVisible(page);
  }

  // Second form page

  /**
   * Fill popup login form
   * @param page {Page} Browser tab or popup
   * @param paypalAccount {Object} Contain information to fill the form
   * @returns {Promise<void>}
   */
  async fillEmailAndPasswordForm(page, paypalAccount) {
    await this.setValue(page, this.emailInput, paypalAccount.email);
    await this.setValue(page, this.passwordInput, paypalAccount.password);
  }

  /**
   * Fill and submit popup login form
   * @param page {Page} Browser tab or popup
   * @param paypalAccount {Object} Contain information to fill the form
   * @returns {Promise<boolean>}
   */
  async fillAndSubmitEmailAndPasswordForm(page, paypalAccount) {
    // Fill form
    await this.fillEmailAndPasswordForm(page, paypalAccount);

    // Submit form
    await page.click(this.submitLoginButton);

    // Check success status
    return this.loginSucceeded(page);
  }

  // Third form page

  /**
   * Click on return to shop and close paypal popup
   * @param page {Page} Browser tab or popup
   * @returns {Promise<boolean>}
   */
  async returnToPrestaShop(page) {
    // Click on button
    await page.click(this.returnToPsxPageButton);

    // Check if popup is closed
    return page.isClosed();
  }
}

module.exports = new POPUP_PAYPAL();
