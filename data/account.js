const psxAccount = {
  email: 'stephane.decisy+seller1@prestashop.com',
  password: 'prestashop',

  // Personal information
  personalInformation: {
    firstname: 'firstname_test',
    lastname: 'lastname_test',
    language: 'Français (French)',
    qualification: 'A merchant',
  },

  // Billing address
  billingAddress: {
    storeName: 'store_test',
    address: '23 Rue de test',
    postCode: '75008',
    city: 'Paris',
    country: 'France',
    countryPhoneCode: '+ 33',
    businessPhone: '0123456789',
  },

  // Business information
  businessInformation: {
    website: 'https://presta-example.io',
    companyTurnover: '25 000€ EUR - 49 999€ EUR',
    category: 'Baby',
    subcategory: 'Clothing',
  },
};

const paypalAccount = {
  email: 'stephane.decisy+seller1@prestashop.com',
  password: 'prestashop',
  country: 'France',
};

module.exports = {psxAccount, paypalAccount};
