require('module-alias/register');

const {expect} = require('chai');
const browserHelper = require('prestashop_test_lib/kernel/utils/helpers.js');
const configClassMap = require('@utils/configClassMap.js');

// Get resolver
const VersionSelectResolver = require('prestashop_test_lib/kernel/resolvers/versionSelectResolver.js');

const versionSelectResolver = new VersionSelectResolver(global.PS_VERSION, configClassMap);

// Import pages
const loginPage = versionSelectResolver.require('BO/login/index.js');
const dashboardPage = versionSelectResolver.require('BO/dashboard/index.js');
const moduleManagerPage = versionSelectResolver.require('BO/modules/moduleManager/index.js');
const psCheckoutPage = versionSelectResolver.require('BO/checkout/index.js');
const psCheckoutAuthHomePage = versionSelectResolver.require('BO/checkout/authentication/index.js');
const psCheckoutPaypalPage = versionSelectResolver.require('BO/checkout/paypal/popup.js');

// Browser vars
let browserContext;
let page;

// Paypal popup page
let paypalPage;

const {paypalAccount} = require('@data/account.js');

const moduleInformation = {
  name: 'PrestaShop Checkout',
  tag: 'ps_checkout',
};


describe('Login to Paypal account', async () => {
  // before and after functions
  before(async function () {
    browserContext = await browserHelper.createBrowserContext(this.browser);

    page = await browserHelper.newTab(browserContext);
  });

  after(async () => {
    await browserHelper.closeBrowserContext(browserContext);
  });

  it('should go to login page', async () => {
    await loginPage.goTo(page, global.BO.URL);

    const pageTitle = await loginPage.getPageTitle(page);
    await expect(pageTitle).to.contains(loginPage.pageTitle);
  });

  it('should login into BO with default user', async () => {
    await loginPage.login(page, global.BO.EMAIL, global.BO.PASSWD);
    await dashboardPage.closeOnboardingModal(page);

    const pageTitle = await dashboardPage.getPageTitle(page);
    await expect(pageTitle).to.contains(dashboardPage.pageTitle);
  });

  it('should go to module manager page', async () => {
    await dashboardPage.goToSubMenu(
      page,
      dashboardPage.modulesParentLink,
      dashboardPage.moduleManagerLink,
    );

    const pageTitle = await moduleManagerPage.getPageTitle(page);
    await expect(pageTitle).to.contain(moduleManagerPage.pageTitle);
  });

  it('should go to configuration page', async () => {
    await moduleManagerPage.goToConfigurationPage(page, moduleInformation.name);

    // Check module name
    const pageSubtitle = await psCheckoutPage.getPageSubtitle(page);
    await expect(pageSubtitle).to.contain(moduleInformation.name);
  });

  it('should open paypal popup', async () => {
    paypalPage = await psCheckoutAuthHomePage.openPaypalLoginPopup(page);
    await expect(paypalPage, 'Popup is not displayed').to.not.equal(null);
  });

  it('should fill first part form and go to login page', async () => {
    const loginFormVisible = await psCheckoutPaypalPage.fillAndSubmitEmailAndCountryForm(paypalPage, paypalAccount);
    await expect(loginFormVisible, 'Failed to pass to login form').to.be.true;
  });

  it('should fill second part form and validate login', async () => {
    const loginSucceeded = await psCheckoutPaypalPage.fillAndSubmitEmailAndPasswordForm(paypalPage, paypalAccount);
    await expect(loginSucceeded, 'Paypal login was not a success').to.be.true;
  });

  it('should close the popup and check the success login', async () => {
    // Click on return to PrestaShop and wait for popup to be closed
    const popupClosed = await psCheckoutPaypalPage.returnToPrestaShop(paypalPage);
    await expect(popupClosed, 'Popup Paypal was not closed').to.be.true;

    // Check if Paypal account id logged in
    const paypalLoggedIn = await psCheckoutAuthHomePage.paypalLoggedIn(page);
    await expect(paypalLoggedIn, 'Link was not established between Paypal and the shop').to.be.true;
  });
});
