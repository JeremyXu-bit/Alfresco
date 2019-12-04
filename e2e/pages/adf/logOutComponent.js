/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../util/util');

var LogoutComponent = function (){

    const dwMenuButton = element(by.xpath('//*[@id="dw-menu-button-id"]/span/mat-icon'));
    const menuPanel = element(by.className('mat-menu-panel'));
    const singOutButton = menuPanel.element(by.id('dw-menu-logout-id'));


    this.clickProfileButton = () =>  {
        dwMenuButton.click();
        Util.waitUntilElementIsVisible(menuPanel);
        Util.waitUntilElementIsVisible(singOutButton);
    };

    this.clickLogOutButton = () =>  {
       this.clearLocalStorage();
       this.clickProfileButton();
        singOutButton.click();
    };

    this.clearLocalStorage = () => {
        browser.executeScript('window.localStorage.clear();');
    };

};

module.exports = LogoutComponent;
