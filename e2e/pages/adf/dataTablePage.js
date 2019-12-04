/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

const Util = require('../../util/util');

const DataTablePage = function () {
    const allSelectedRows = element.all(by.css("div[class*='is-selected']"));
    const list = element.all(by.css("div[class*=adf-datatable-row]"));
    const dataTableList = element.all(by.css('.adf-datatable-row'));
    const dataTableHeader = element.all(by.css('.adf-datatable-table-cell-header'));
    const noContentMessage = element(by.css("p[class='adf-empty-content__title']"));
    const actionsButton = element(by.css('.adf-data-table-cell button[class="mat-icon-button ng-star-inserted"]'));
    const menuPanel = element(by.className('mat-menu-panel'));
    const taskList = element(by.css('[data-automation-id="tasklist-table"]'));
    const processList = element(by.css('[data-automation-id="process-list"]'));
    const infoButton = element (by.css('.dw-breadcrumb-action-container .mat-icon'));

    this.getColumnByName = (name) => {
        return dataTableHeader
            .map((headings) => headings.getText())
            .then((headers) => headers.findIndex(element => element === name));
    };

    this.getRowDataByRowNumber = function (rowNumber) {
        return this.getRowByRowNumber(rowNumber)
            .all(by.css('.adf-data-table-cell'))
            .map((row) => row.getText());
    };

    this.getRowByRowNumber = (rowNumber) => {
        return element
            .all(by.css(".adf-datatable-body .adf-datatable-row"))
            .get(rowNumber)
    };

    this.selectRow = (rowNumber) => {
        return this.getRowByRowNumber(rowNumber).click();
    };

    this.selectRowDoubleClick = (rowNumber) => {
        const dblClick = browser.actions()
            .mouseMove(this.getRowByRowNumber(rowNumber))
            .click()
            .click();

        return dblClick.perform();
    };

    this.checkNoContentMessage = () => {
        Util.waitUntilElementIsVisible(noContentMessage);
    };

    this.selectFromProcessList = (title) => {
        const processName = element.all(by.css('div[data-automation-id="text_'+ title +'"]')).first();
        Util.waitUntilElementIsVisible(processName);
        processName.click();
    };

    this.goToProcessDetailsPage = function (title) {
        const processName = element.all(by.css('div[data-automation-id="text_'+ title +'"]')).first();
        Util.waitUntilElementIsVisible(processName);
        processName.click().click();
    };

    this.checkNameIsDisplayedInList = (title) => {
        const name = element.all(by.css('div[data-automation-id="text_'+ title +'"]')).first();
        Util.waitUntilElementIsVisible(name);
    };

    this.clickMenuItem = (name) =>{
      element(by.cssContainingText('.mat-menu-item', name)).click();
    };

    this.clickActionsButton = () =>{
       actionsButton.click();
       Util.waitUntilElementIsVisible(menuPanel);
    };

    this.selectRowWithKeyboard = function (rowNumber) {
        const row = this.getRowByRowNumber(rowNumber);
        browser.actions().sendKeys(protractor.Key.COMMAND).click(row).perform();
    };

    this.clickInfoButton = () => {
        Util.waitUntilElementIsVisible(infoButton);
        infoButton.click();
    };

    this.checkRowIsSelected = function (rowNumber) {
        const isRowSelected = this.getRowByRowNumber(rowNumber).element(by.xpath("ancestor::div[contains(@class, 'is-selected')]"));
        Util.waitUntilElementIsVisible(isRowSelected);
    };

    this.checkRowIsNotSelected = function (rowNumber) {
        const isRowSelected = this.getRowByRowNumber(rowNumber).element(by.xpath("ancestor::div[contains(@class, 'adf-datatable-row custom-row-style ng-star-inserted is-selected')]"));
        Util.waitUntilElementIsNotOnPage(isRowSelected);
    };

     this.getNumberOfRows = function () {
        return list.count();
    };

    this.getNumberOfSelectedRows = function () {
        return allSelectedRows.count();
    };

    this.navigateToContent = function (content) {
        const row = this.getRowByRowName(content);
        Util.waitUntilElementIsPresent(row);
        row.click();
        this.checkRowIsSelected(content);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        return this;
    };

    this.getRowsName = function (content) {
        const row = element(by.css("div[data-automation-id*='" + content + "']"));
        Util.waitUntilElementIsPresent(row);
        return row;
    };

    this.getRowByRowName = function (content) {
        const rowByRowName = by.xpath("ancestor::div[contains(@class, 'adf-datatable-row')]");
        Util.waitUntilElementIsPresent(this.getRowsName(content).element(rowByRowName));
        return this.getRowsName(content).element(rowByRowName);
    };

    this.waitForTableBody = function () {
        Util.waitUntilElementIsVisible(dataTableList);
    };

    this.waitForTaskList = function () {
        Util.waitUntilElementIsVisible(taskList);
    };

    this.waitForProcessList = function () {
        Util.waitUntilElementIsVisible(processList);
    };

    this.waitForNrOfRows = (numberOfRows) => {
        const fn = () => {
            return this.getNumberOfRows()
                .then(count => {
                    if (count === numberOfRows) {
                        return Promise.resolve(count);
                    } else {
                        return Promise.reject(count);
                    }
                });
      }

      return this.retryCall(fn);
    };

    this.retryCall = (fn, retry = 30, delay = 1000) => {
        const pause = (duration) => new Promise(res => time = setTimeout(res, duration));

        const run = (retries) =>
            fn().catch(err => retries > 1
                    ? pause(delay).then(() => browser.refresh()).then(() => run(retries - 1))
                    : Promise.reject(err));

        return run(retry);
    };
};

module.exports = DataTablePage;
