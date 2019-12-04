/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../../util/util');

var StartProcessPage = function () {

    var defaultProcessName = element(by.css("input[id='processName']"));
    var processNameInput = element(by.id('processName'));
    var selectProcessDropdownArrow = element(by.css("button[id='adf-select-process-dropdown']"));
    var cancelProcessButton = element(by.id('cancel_process'));
    var formStartProcessButton = element(by.css('button[data-automation-id="adf-form-start process"]'));
    var startProcessButton = element(by.css("button[data-automation-id='btn-start']"));
    var noProcess = element(by.id('no-process-message'));

    this.checkNoProcessMessage = function () {
        Util.waitUntilElementIsVisible(noProcess);
    }

    this.getDefaultName = function () {
        Util.waitUntilElementIsVisible(defaultProcessName);
        return defaultProcessName.getAttribute("value");
    };

    this.deleteDefaultName = function (value) {
        Util.waitUntilElementIsVisible(processNameInput);
        processNameInput.getAttribute('value').then(function (value){
            for (var i = value.length; i >= 0; i--) {
                processNameInput.sendKeys(protractor.Key.BACK_SPACE);
            }
        });
    };

    this.enterProcessName = function (name) {
        Util.waitUntilElementIsVisible(processNameInput);
        processNameInput.clear();
        processNameInput.sendKeys(name);
    };

    this.selectFromProcessDropdown = function (name) {
        Util.waitUntilElementIsVisible(selectProcessDropdownArrow);
        Util.waitUntilElementIsClickable(selectProcessDropdownArrow)
        selectProcessDropdownArrow.click();
        var selectProcessDropdown = element(by.cssContainingText('.mat-option-text', name));
        Util.waitUntilElementIsVisible(selectProcessDropdown);
        Util.waitUntilElementIsClickable(selectProcessDropdown);
        selectProcessDropdown.click();
        return this;
    };

    this.clickCancelProcessButton = function () {
        Util.waitUntilElementIsVisible(cancelProcessButton);
        cancelProcessButton.click();
    };

    this.clickFormStartProcessButton = function () {
        Util.waitUntilElementIsVisible(formStartProcessButton);
        Util.waitUntilElementIsClickable(formStartProcessButton);
        return formStartProcessButton.click();
    };

    this.checkStartProcessButtonIsEnabled = function () {
        expect(startProcessButton.isEnabled()).toBe(true);
    };

    this.checkStartProcessButtonIsDisabled = function () {
        expect(startProcessButton.isEnabled()).toBe(false);
    };

    this.clickStartProcessButton = () => {
        Util.waitUntilElementIsVisible(startProcessButton);
        Util.waitUntilElementIsClickable(startProcessButton);
        return startProcessButton.click();
    };
};

module.exports = StartProcessPage;
