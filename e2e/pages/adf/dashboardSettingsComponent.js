/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../util/util');

var DashboardSettingsComponent = function (){

    const dashboardSubtitle = element(by.id('dashboard-setting-subtitle-id'));
    const processDefinition = element(by.className('mat-select-value-text'));
    const statusDropdown = element(by.id('select-processdef-status-id'));
    const dateDatePickerButtons = element.all(by.className('mat-datepicker-toggle'));
    const datePickerValue = element(by.cssContainingText('.mat-calendar-body-cell-content', '24'));
    const startDateInput = element(by.id('fromdate-id'));
    const endDateInput = element(by.id('todate-id'));

    this.getDashboardSettingsSubtitle = () => {
        dashboardSubtitle.getText();
    };

    this.clickProcessDefinitionDropDown = () => {
        Util.waitUntilElementIsVisible(processDefinition);
        processDefinition.click();
    };

    this.getProcessDefinitionText = () => {
        return processDefinition.getText();
    };

    this.clickStatusDropdown = () => {
        Util.waitUntilElementIsVisible(statusDropdown);
        statusDropdown.click();
    };

    this.getStatusValue = () => {
        return statusDropdown.getText();
    };

    this.selectStatusValue = (name) => {
        const statusDropDownValue = element(by.cssContainingText('.mat-option-text', name));
        Util.waitUntilElementIsVisible(statusDropDownValue);
        Util.waitUntilElementIsClickable(statusDropDownValue);
        statusDropDownValue.click();
    };

    this.clickDatePickerButton = (index) =>  {
        return dateDatePickerButtons.get(index).click();
    };

    this.selectDatePickerValue = () => {
        Util.waitUntilElementIsVisible(datePickerValue);
        Util.waitUntilElementIsClickable(datePickerValue);
        datePickerValue.click();
    };

    this.getStartDate = () => {
        return startDateInput.getAttribute('value');
    };

    this.changeStartDate = (date) =>{
        Util.waitUntilElementIsVisible(startDateInput);
        this.removeFromDateWidget(startDateInput);
        startDateInput.sendKeys(date);
    };

    this.removeFromDateWidget = (widget)  => {
        Util.waitUntilElementIsVisible(widget);

        widget.getAttribute('value').then((result) => {
            for (let i = result.length; i >= 0; i--) {
                widget.sendKeys(protractor.Key.BACK_SPACE);
            }
        });
    }

    this.getEndDate = () => {
        return endDateInput.getAttribute('value');
    };

    this.changeEndDate = (date) =>{
        Util.waitUntilElementIsVisible(endDateInput);
        this.removeFromDateWidget(endDateInput);
        endDateInput.sendKeys(date);
    };

    this.selectProcessDefinitionValue = (name) => {
        const processDefinitionValue = element(by.cssContainingText('.mat-option .mat-option-text', name));
        Util.waitUntilElementIsVisible(processDefinitionValue);
        Util.waitUntilElementIsClickable(processDefinitionValue);
        processDefinitionValue.click();
    };

};

module.exports = DashboardSettingsComponent;
