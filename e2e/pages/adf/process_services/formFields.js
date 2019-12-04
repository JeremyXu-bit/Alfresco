/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../../util/util');

var FormFields = function () {

    const formContent = element(by.css("adf-form"));
    const refreshButton = element(by.css("div[class*='form-reload-button'] mat-icon"));
    const saveButton = element(by.cssContainingText("mat-card-actions[class*='adf-form'] span", "SAVE"));
    const valueLocator = by.css("input");
    const labelLocator = by.css("label");
    const formInputField = element(by.id('textfield'));

    this.setFieldValue = function (By, field, value) {
        var fieldElement =  element(By(field));
        Util.waitUntilElementIsVisible(fieldElement);
        fieldElement.clear().sendKeys(value);
        return this;
    };

    this.getWidget = function (fieldId) {
        var widget = element(by.css("form-field div[id='field-" + fieldId + "-container']"));
        Util.waitUntilElementIsVisible(widget);
        return widget;
    };

    this.getFieldValue = function (fieldId, valueLocatorParam) {
        var value = this.getWidget(fieldId).element(valueLocatorParam || valueLocator);
        Util.waitUntilElementIsVisible(value);
        return value.getAttribute('value');
    };

    this.getFieldLabel = function (fieldId, labelLocatorParam) {
        return this.getFieldText(fieldId, labelLocatorParam);
    };

    this.getFieldText = function (fieldId, labelLocatorParam) {
        var label = this.getWidget(fieldId).element(labelLocatorParam || labelLocator);
        Util.waitUntilElementIsVisible(label);
        return label.getText();
    };

    this.checkFieldValue = function (By, field, val) {
        Util.waitUntilElementHasValue(element(By(field)), val);
        return this;
    };

    this.refreshForm = () => {
        Util.waitUntilElementIsVisible(refreshButton);
        refreshButton.click();
        return this;
    };

    this.saveForm = () => {
        Util.waitUntilElementIsVisible(saveButton);
        Util.waitUntilElementIsClickable(saveButton);
        saveButton.click();
        return this;
    };

    this.noFormIsDisplayed = () => {
        Util.waitUntilElementIsNotOnPage(formContent);
        return this;
    };

    this.checkFormIsDisplayed = () => {
        Util.waitUntilElementIsVisible(formContent);
        return this;
    };

    this.addText = (text) => {
        Util.waitUntilElementIsVisible(formContent);
        formInputField.sendKeys(text).click();
        return this;
    };


};

module.exports = FormFields;
