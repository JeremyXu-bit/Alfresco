/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

const Util = require('../../../util/util');

var DialogConfirmationComponent = function () {

    const dialogConfirmation = element(by.className('mat-dialog-container'));
    const saveButton = element(by.cssContainingText(".mat-dialog-actions .mat-button-wrapper",'SAVE'));
    const discardButton = element(by.cssContainingText(".mat-dialog-actions .mat-button-wrapper",'DISCARD'));
    const yesButton = element(by.cssContainingText(".mat-dialog-actions .mat-button-wrapper",'YES'));
    const noButton = element(by.cssContainingText(".mat-dialog-actions .mat-button-wrapper",'NO'));

    this.clickSaveButton = () =>  {
        Util.waitUntilElementIsVisible(dialogConfirmation);
        Util.waitUntilElementIsVisible(saveButton);
        saveButton.click();

    };

    this.clickDiscardButton = () =>  {
        Util.waitUntilElementIsVisible(dialogConfirmation);
        Util.waitUntilElementIsVisible(discardButton);
        Util.waitUntilElementIsClickable(discardButton);
        discardButton.click();
    };

    this.clickYesButton = () =>  {
        Util.waitUntilElementIsVisible(dialogConfirmation);
        Util.waitUntilElementIsVisible(yesButton);
        Util.waitUntilElementIsClickable(yesButton);
        yesButton.click();
    };

    this.clickNoButton = () =>  {
        Util.waitUntilElementIsVisible(dialogConfirmation);
        Util.waitUntilElementIsVisible(noButton);
        Util.waitUntilElementIsClickable(noButton);
        noButton.click();
    };

};

module.exports = DialogConfirmationComponent;
