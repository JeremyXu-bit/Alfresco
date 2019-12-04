/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../../util/util');

var CreateFolderDialog = function () {

    var folderNameField = element(by.css("input[placeholder='Name']"));
    var folderDescriptionField = element(by.css("textarea[placeholder='Description']"));
    var createButton = element(by.cssContainingText("button span", "Create"));
    var cancelButton = element(by.cssContainingText("button span", "Cancel"));

    this.clickOnCreateButton = function () {
        Util.waitUntilElementIsVisible(createButton);
        createButton.click();
        return this;
    };

    this.clickOnCancelButton = function () {
        Util.waitUntilElementIsVisible(cancelButton);
        cancelButton.click();
        return this;
    };

    this.addFolderName = function (folderName) {
        Util.waitUntilElementIsVisible(folderNameField);
        folderNameField.sendKeys(folderName);
        return this;
    };

    this.addFolderDescription = function (folderDescription) {
        Util.waitUntilElementIsVisible(folderDescriptionField);
        folderDescriptionField.sendKeys(folderDescription);
        return this;
    };

};
module.exports = CreateFolderDialog;
