/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

const Util = require('../../../util/util');

const StartTaskPage = function () {

    const name = element(by.css("input[id='name_id']"));
    const description = element(by.css("textarea[id='description_id']"));
    const assignee = element(by.css("input[data-automation-id='adf-people-search-input']"));
    const formDropDown = element(by.css("mat-select[id='form_id']"));
    const startButton = element(by.css("button[id='button-start']"));
    const startButtonEnabled = element(by.css("button[id='button-start']:not(disabled)"));
    const cancelButton = element(by.css("button[id='button-cancel']"));

    this.addName = function (userName) {
        Util.waitUntilElementIsVisible(name);
        name.sendKeys(userName);
        return this;
    };

    this.addDescription = function (userDescription) {
        Util.waitUntilElementIsVisible(description);
        description.sendKeys(userDescription);
        return this;
    };

    this.addAssignee = (name) => {
        Util.waitUntilElementIsVisible(assignee);
        assignee.sendKeys(name);
        this.selectAssigneeFromList(name);
        return this;
    };

    this.selectAssigneeFromList = (name) => {
        Util.waitUntilElementIsVisible(element(by.className('adf-people-widget-list')));
        const assigneeRow = element(by.cssContainingText(".adf-people-label-name", name));
        Util.waitUntilElementIsVisible(assigneeRow);
        assigneeRow.click();
        return this;
    };

    this.getAssignee = function () {
        Util.waitUntilElementIsVisible(assignee);
        return assignee.getAttribute('placeholder');
    };

    this.addForm = function (form) {
        Util.waitUntilElementIsVisible(formDropDown);
        formDropDown.click();
        return this.selectForm(form);
    };

    this.selectForm = function (form) {
        var option = element(by.cssContainingText("span[class*='mat-option-text']", form));
        Util.waitUntilElementIsVisible(option);
        Util.waitUntilElementIsClickable(option);
        option.click();
        return this;
    };

    this.clickStartButton = function () {
        Util.waitUntilElementIsVisible(startButton);
        Util.waitUntilElementIsClickable(startButton);
        return startButton.click();
    };

    this.checkStartButtonIsEnabled = function () {
        Util.waitUntilElementIsVisible(startButtonEnabled);
        return this;
    };

    this.checkStartButtonIsDisabled = function () {
        Util.waitUntilElementIsVisible(startButton.getAttribute("disabled"));
        return this;
    };

    this.clickCancelButton = function () {
        Util.waitUntilElementIsVisible(cancelButton);
        Util.waitUntilElementIsClickable(cancelButton);
        return cancelButton.click();
    };
};

module.exports = StartTaskPage;
