/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../../util/util');

var UserInfoDialog = function () {

    const dialog = element(by.className("adf-userinfo-card"));
    const userImage = element(by.css('.adf-userinfo-button-profile [id="user-initials-image"]'));
    const userInfoBpmHeaderTitle = element(by.css('div[id="bpm-username"]'));
    const userInfoBpmTitle = element(by.id('bpm-full-name'));
    const bpmEmail = element(by.id('bpm-email'));
    const headerContainer = element(by.className('dw-appsgrid-container'));
    const processTenant = element(by.className('adf-userinfo__detail-profile'));
    const userInfoName = element(by.className('adf-userinfo-name'));

    this.clickUserImage = () => {
        Util.waitUntilElementIsVisible(userImage);
        userImage.click();
        Util.waitUntilElementIsVisible(dialog)
        return this;
    };

    this.clickHeader = () => {
        Util.waitUntilElementIsVisible(headerContainer);
        headerContainer.click();
    };

    this.dialogIsDisplayed = () => {
        Util.waitUntilElementIsVisible(dialog);
        return this;
    };

    this.dialogIsNotDisplayed = () => {
        Util.waitUntilElementIsNotOnPage(dialog);
        return this;
    };

    this.clickOnProcessServicesTab = () => {
        this.processServicesTabIsDisplayed();
        processServicesTab.click();
        return this;
    };

    this.userImageIsDisplayed = () => {
        Util.waitUntilElementIsVisible(userImage);
        return this;
    };

    this.getUserInfoName = () => {
        Util.waitUntilElementIsVisible(userInfoName);
        return userInfoName.getText();
    };

    this.getContentHeaderTitle = () => {
        Util.waitUntilElementIsVisible(dialog);
        Util.waitUntilElementIsVisible(userInfoBpmHeaderTitle);
        return userInfoBpmHeaderTitle.getText();
    };

    this.getContentTitle = () => {
        Util.waitUntilElementIsVisible(dialog);
        Util.waitUntilElementIsVisible(userInfoBpmTitle);
        return userInfoBpmTitle.getText();
    };

    this.getContentEmail = () => {
        Util.waitUntilElementIsVisible(dialog);
        Util.waitUntilElementIsVisible(bpmEmail);
        return bpmEmail.getText();
    };

    this.getProcessTenant = () => {
        Util.waitUntilElementIsVisible(dialog);
        Util.waitUntilElementIsVisible(processTenant);
        return processTenant.getText();
    };

    this.checkTenantTitleIsDisplayed = (title) => {
        Util.waitUntilElementIsVisible(dialog);
        var row = element(by.cssContainingText(".adf-userinfo-detail", title));
        Util.waitUntilElementIsVisible(row);
        return this;
    };

    this.closeUserProfile = function () {
        Util.waitUntilElementIsVisible(dialog);
        browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
        Util.waitUntilElementIsNotVisible(dialog);
    };

};
module.exports = UserInfoDialog;
