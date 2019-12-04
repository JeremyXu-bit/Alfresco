/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../util/util');


var HeaderComponent = function () {
    const menuButton = element(by.css('[data-automation-id="adf-menu-icon"]'));
    const logo = element(by.className('adf-app-logo'));
    const languageButton = element(by.css('[data-automation-id="language-menu-button"]'));
    const userImage = element(by.css('.adf-userinfo-button-profile [id="user-initials-image"]'));
    const actionsButton = element(by.xpath('//*[@id="dw-menu-button-id"]/span/mat-icon'));
    const menuPanel = element(by.className('mat-menu-panel'));
    const firstLanguage = element(by.css('adf-language-menu>button'));

    this.checkMenuButtonIsDisplayed = () => {
        Util.waitUntilElementIsVisible(menuButton);
    };

    this.checkLogoIsDisplayed = () => {
        Util.waitUntilElementIsVisible(logo);
    };

    this.checkTitleIsDisplayed = (title) => {
        Util.waitUntilElementIsVisible(element(by.cssContainingText('.adf-app-title', title)));
    };

    this.checkLanguageButtonIsDisplayed = () => {
        actionsButton.click();
        Util.waitUntilElementIsVisible(menuPanel);
        Util.waitUntilElementIsVisible(languageButton);
        Util.waitUntilElementIsVisible(firstLanguage);
        firstLanguage.click();
    };

    this.checkUserNameIsDisplayed = (user) => {
        Util.waitUntilElementIsVisible(element(by.cssContainingText('.adf-userinfo-name', user)));
    };

    this.checkUserImageIsDisplayed = () => {
        Util.waitUntilElementIsVisible(userImage);
    };

    this.checkActionsButtonIsDisplayed = () => {
        Util.waitUntilElementIsVisible(actionsButton);
    };
}

module.exports = HeaderComponent;
