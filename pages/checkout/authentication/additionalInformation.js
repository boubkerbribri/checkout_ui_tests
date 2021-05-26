// Import checkout authentication page
const CheckoutAuthenticationPage = require('@pages/checkout/authentication/index.js');

class PS_CHECKOUT_ADDITIONAL_INFORMATION extends CheckoutAuthenticationPage.constructor {
  constructor() {
    super();

    // Selectors
    // Prestashop checkout account additional information form

    // Personal information
    this.firstnameInput = '#firstName';
    this.lastnameInput = '#lastName';
    this.languageSelect = '#language';
    this.qualificationSelect = '#qualification';

    // Billing address
    this.storeNameInput = '#storeName';
    this.addressInput = '#address';
    this.postCodeInput = '#postCode';
    this.cityInput = '#town';
    this.countrySelect = '#country';
    this.countryPhoneCodeSelect = '#phone-country';
    this.businessPhoneInput = '#business-phone-number';

    // Business information
    this.websiteInput = '#website';
    this.companyTurnoverSelect = '#company-turnover';
    this.businessCategorySelect = '#business-category';
    this.businessSubcategorySelect = '#business-subcategory';

    // Footer buttons
    this.submitSignupFormButton = '#submit-signup-form-button';
  }

  // Ps checkout account additional information functions

  /**
   * Fill personal information block on form
   * @param page {Page} Browser tab
   * @param accountPersonalInformation {Object} Contains only personal information to fill form
   * @returns {Promise<void>}
   */
  async fillPersonalInformationForm(page, accountPersonalInformation) {
    await this.setValue(page, this.firstnameInput, accountPersonalInformation.firstname);
    await this.setValue(page, this.lastnameInput, accountPersonalInformation.lastname);
    await this.selectByVisibleText(page, this.languageSelect, accountPersonalInformation.language);
    await this.selectByVisibleText(page, this.qualificationSelect, accountPersonalInformation.qualification);
  }

  /**
   * Fill billing address form
   * @param page {Page} Browser tab
   * @param accountBillingAddress {Object} Contains only billing address to fill form
   * @returns {Promise<void>}
   */
  async fillBillingAddressForm(page, accountBillingAddress) {
    await this.setValue(page, this.storeNameInput, accountBillingAddress.storeName);
    await this.setValue(page, this.addressInput, accountBillingAddress.address);
    await this.setValue(page, this.postCodeInput, accountBillingAddress.postCode);
    await this.setValue(page, this.cityInput, accountBillingAddress.city);
    await this.selectByVisibleText(page, this.countrySelect, accountBillingAddress.country);
    await this.selectByVisibleText(page, this.countryPhoneCodeSelect, accountBillingAddress.countryPhoneCode);
    await this.setValue(page, this.businessPhoneInput, accountBillingAddress.businessPhone);
  }

  /**
   * Fill business information form
   * @param page {Page} Browser tab
   * @param accountBusinessInformation {Object} Contains only business information to fill form
   * @returns {Promise<void>}
   */
  async fillBusinessInformation(page, accountBusinessInformation) {
    await this.setValue(page, this.websiteInput, accountBusinessInformation.website);
    await this.selectByVisibleText(page, this.companyTurnoverSelect, accountBusinessInformation.companyTurnover);
    await this.selectByVisibleText(page, this.businessCategorySelect, accountBusinessInformation.category);
    await this.selectByVisibleText(page, this.businessSubcategorySelect, accountBusinessInformation.subcategory);
  }

  /**
   * Fill all form
   * @param page {Page} Browser tab
   * @param accountInformation {Object} Information to fill the form
   * @returns {Promise<void>}
   */
  async fillAdditionalInformationForm(page, accountInformation) {
    // Fill each form if its object is set
    // Personal info
    if (accountInformation.personalInformation) {
      await this.fillPersonalInformationForm(page, accountInformation.personalInformation);
    }

    // Billing address
    if (accountInformation.billingAddress) {
      await this.fillBillingAddressForm(page, accountInformation.billingAddress);
    }

    // Business information
    if (accountInformation.businessInformation) {
      await this.fillBusinessInformation(page, accountInformation.businessInformation);
    }
  }

  /**
   * Add additional information and login
   * @param page {Page} Browser tab
   * @param accountInformation {Object} Information to fill the form
   * @returns {Promise<boolean>}
   */
  async fillAndSubmitAdditionalInformation(page, accountInformation) {
    // Fill all form
    await this.fillAdditionalInformationForm(page, accountInformation);

    // Submit form
    await page.click(this.submitSignupFormButton);

    // Check that user is logged in
    return this.isPsxLoggedIn(page);
  }
}

module.exports = new PS_CHECKOUT_ADDITIONAL_INFORMATION();
