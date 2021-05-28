const faker = require('faker');

const qualificationsData = require('@data/demo/qualifications');
const companyTurnoversData = require('@data/demo/companyTurnovers');

/**
 * Create data to use to create a new account for psx
 * @class
 */
class PSX_ACCOUNT_FAKER {
  /**
   * Constructor for class PsAccount
   * @param accountToCreate {Object} Could be used to force the value of some members
   */
  constructor(accountToCreate = {}) {
    /** @member {string} Related account email */
    this.email = accountToCreate.email || faker.internet.email(this.firstName, this.lastName, 'prestashop.com');

    /** @member {string} Related account password */
    this.password = accountToCreate.password || 'prestashop';

    /** @member {firstname, lastname, language, qualification} Account personal information */
    this.personalInformation = {
      /** @member {string} Account firstname */
      firstname: accountToCreate.firstname || faker.name.firstName(),

      /** @member {string} Account lastname */
      lastname: accountToCreate.lastname || faker.name.lastName(),

      /** @member {string} Account lastname */
      language: accountToCreate.language || 'Français (French)',

      /** @member {string} Qualification of the account */
      qualification: accountToCreate.qualification || faker.random.arrayElement(qualificationsData),
    };

    /**
     * @member {storeName, address, postCode, city, country, countryPhoneCode, businessPhone}
     * @description Billing address information
     */
    this.billingAddress = {
      /** @member {string} Name of the store */
      storeName: (accountToCreate.storeName || faker.company.companyName()).substring(0, 63),

      /** @member {string} Address first line */
      address: accountToCreate.address || faker.address.streetAddress(),

      /** @member {string} Address postal code (default to this format #####) */
      postCode: accountToCreate.postCode || faker.address.zipCode('#####'),

      /** @member {string} Address city name */
      city: accountToCreate.city || faker.address.city(),

      /** @member {string} Address country name */
      country: accountToCreate.country || 'France',

      /** @member {string} Country phone code */
      countryPhoneCode: accountToCreate.countryPhoneCode || '+ 33',

      /** @member {string} Business phone number */
      businessPhone: accountToCreate.businessPhone || faker.phone.phoneNumber('01########'),
    };

    /** @member {website, companyTurnover, category, subcategory} Business information */
    this.businessInformation = {
      /** @member {string} Business phone number */
      website: accountToCreate.website || 'https://www.presta-qa-test.com',

      /** @member {string} Company estimated monthly turnover */
      companyTurnover: accountToCreate.companyTurnover || faker.random.arrayElement(companyTurnoversData),

      /** @member {string} Business category */
      category: accountToCreate.category || 'Baby',

      /** @member {string} Business subcategory */
      subcategory: accountToCreate.subcategory || 'Clothing',
    };
  }
}

module.exports = PSX_ACCOUNT_FAKER;
