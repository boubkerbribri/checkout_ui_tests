// Get resolver
const VersionSelectResolver = require('prestashop_test_lib/kernel/resolvers/versionSelectResolver');

const versionSelectResolver = new VersionSelectResolver(global.PS_VERSION);

// Import BOBasePage
const ModuleConfigurationPage = versionSelectResolver.require('BO/modules/moduleConfiguration/index.js');

class PS_CHECKOUT extends ModuleConfigurationPage.constructor {
  constructor() {
    super();

    // Selectors

    // Tabs
    this.authenticationTabLink = '#authentication-tab-link';
    this.customizeTabLink = '#customize-tab-link';
    this.activityTabLink = '#activity-tab-link';
    this.advancedTabLink = '#advanced-tab-link';
    this.helpTabLink = '#help-tab-link';
  }

  // Tabs functions
  /**
   * Go to specific tab
   * @param page {Page} Browser tab
   * @param tabSelector {string} Selector to click on
   * @returns {Promise<void>}
   */
  async goToTab(page, tabSelector) {
    await this.clickAndWaitForNavigation(page, tabSelector);
    await this.waitForVisibleSelector(page, `${tabSelector}.active`);
  }

  /**
   * Go to authentication tab
   * @param page {Page} Browser tab
   * @returns {Promise<void>}
   */
  async goToAuthenticationTab(page) {
    await this.goToTab(page, this.authenticationTabLink);
  }

  /**
   * Go to customize tab
   * @param page {Page} Browser tab
   * @returns {Promise<void>}
   */
  async goToCustomizeTab(page) {
    await this.goToTab(page, this.customizeTabLink);
  }

  /**
   * Go to activity tab
   * @param page {Page} Browser tab
   * @returns {Promise<void>}
   */
  async goToActivityTab(page) {
    await this.goToTab(page, this.activityTabLink);
  }

  /**
   * Go to advanced tab
   * @param page {Page} Browser tab
   * @returns {Promise<void>}
   */
  async goToAdvancedTab(page) {
    await this.goToTab(page, this.advancedTabLink);
  }

  /**
   * Go to help tab
   * @param page {Page} Browser tab
   * @returns {Promise<void>}
   */
  async goToHelpTab(page) {
    await this.goToTab(page, this.helpTabLink);
  }
}

module.exports = new PS_CHECKOUT();
