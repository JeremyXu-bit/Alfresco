/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../../util/util');
var ContentList = require('../dialog/contentList');
var StartProcessPage = require('./startProcessPage');

var ProcessFiltersPage = function () {
    var newProcessButton = element(by.css("div > button[data-automation-id='btn-start-process']"));
    var processesPage = element(by.css("div[class='adf-grid'] > div[class='adf-grid-item adf-processes-menu']"));
    var accordionMenu = element(by.css(".adf-processes-menu adf-accordion"));
    var buttonWindow = element(by.css("div > button[data-automation-id='btn-start-process'] > div"));
    var rows = by.css("adf-process-instance-list div[class='adf-datatable-body'] div[class*='adf-datatable-row']");
    var tableBody = element.all(by.css("adf-datatable div[class='adf-datatable-body']")).first();
    var contentList = new ContentList();
    var nameColumn = by.css("div[class*='adf-datatable-body'] div[class*='adf-datatable-row'] div[class*='--text'] span");

    this.startProcess = function () {
        this.clickCreateProcessButton();
        this.clickNewProcessDropdown();
        return new StartProcessPage();
    };

    this.clickNewProcessDropdown = function () {
        Util.waitUntilElementIsOnPage(buttonWindow);
        Util.waitUntilElementIsVisible(newProcessButton);
        Util.waitUntilElementIsClickable(newProcessButton);
        newProcessButton.click();
    };

    this.checkFilterIsHighlighted = function (filterName) {
        var processNameHighlighted = element(by.css("mat-list-item.active span[data-automation-id='" + filterName + "_filter']"));
        Util.waitUntilElementIsVisible(processNameHighlighted);
    };

    this.numberOfProcessRows = function () {
        return element.all(rows).count();
    };

    this.waitForTableBody = function (){
        Util.waitUntilElementIsVisible(tableBody);
    };

    /**
     *  Sort the list by name column.
     *
     * @param sortOrder : 'true' to sort the list ascendant and 'false' for descendant
     */
    this.sortByName = function (sortOrder) {
        contentList.sortByName(sortOrder);
    };

    this.getAllRowsNameColumn = function () {
        return contentList.getAllRowsColumnValues(nameColumn);
    };

};

module.exports = ProcessFiltersPage;
