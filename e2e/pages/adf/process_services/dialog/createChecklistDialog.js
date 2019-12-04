/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../../../util/util');

var ChecklistDialog = function () {

    var nameField = element(by.css("input[data-automation-id='checklist-name']"));
    var checklistButton = element(by.css("button[id='add-check'] span"));

    this.addName = function (name) {
        Util.waitUntilElementIsVisible(nameField);
        nameField.sendKeys(name);
        return this;
    };

    this.clickCreateChecklistButton = function () {
        Util.waitUntilElementIsVisible(checklistButton);
        checklistButton.click();
    };

};
module.exports = ChecklistDialog;
