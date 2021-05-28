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
const psCheckoutAuthLoginPage = versionSelectResolver.require('BO/checkout/authentication/login.js');
const psCheckoutAuthAdditionalInfoPage = versionSelectResolver.require(
  'BO/checkout/authentication/additionalInformation.js',
);

// Import data
const {psxAccount} = require('@data/demo/accounts.js');

// Browser vars
let browserContext;
let page;

// Import module information
const moduleInformation = require('@data/demo/moduleInformation.js');


describe('Login to PSx account on BO', async () => {
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

  it('should go to login form', async () => {
    const loginFormDisplayed = await psCheckoutAuthHomePage.goToPsxLoginForm(page);
    await expect(loginFormDisplayed).to.be.true;
  });

  it('should login and pass to additional information form', async () => {
    const additionalInformationFormDisplayed = await psCheckoutAuthLoginPage.loginToPsx(page, psxAccount);
    await expect(additionalInformationFormDisplayed).to.be.true;
  });

  it('should add additional information and validate login', async () => {
    const userLoggedIn = await psCheckoutAuthAdditionalInfoPage.fillAndSubmitAdditionalInformation(page, psxAccount);
    await expect(userLoggedIn).to.be.true;
  });
});
