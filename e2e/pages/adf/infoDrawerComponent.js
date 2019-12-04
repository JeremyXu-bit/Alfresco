/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../util/util');

var InfoDrawerComponent = function() {

const infoDrawerContent = element(by.className('adf-info-drawer-layout'));
const title = element(by.className('adf-info-drawer-layout-header-title'));
const closeButton = element(by.css('[data-automation-id="close"]'));
const expandButton = element(by.css('[data-automation-id="expand"]'))
const expandTaskButton = element(by.css('[data-automation-id="task-open-new"]'))
const closeTaskInfoButton = element(by.css('[data-automation-id="task-close"]'))

this.getInfoDrawerTitle = () =>  {
   title.getText();
};

this.clickCloseInfoDrawer = () =>  {
   closeButton.click();
};

this.clickExpandButton = () =>  {
    expandButton.click();
};

this.clickExpandTaskButton = () =>  {
    expandTaskButton.click();
};

this.clickCloseTaskInfoButton = () =>  {
    closeTaskInfoButton.click();
};

this.checkInfoDrawerContentIsDisplayed = () => {
    Util.waitUntilElementIsVisible(infoDrawerContent);
};

this.checkInfoDrawerContentIsNotDisplayed = () => {
    Util.waitUntilElementIsNotVisible(infoDrawerContent);
};

};

module.exports = InfoDrawerComponent;
