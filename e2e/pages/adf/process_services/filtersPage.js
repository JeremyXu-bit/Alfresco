/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../../util/util');
var ContentList = require('../dialog/contentList');

var FiltersPage = function () {

    var activeFilter = element(by.css("mat-list-item[class*='active']"));
    var nameColumn = by.css("div[class*='adf-datatable-body'] div[class*='adf-datatable-row'] div[class*='--text'] span");
    var contentList = new ContentList();

    this.getActiveFilter = function () {
        Util.waitUntilElementIsVisible(activeFilter);
        return activeFilter.getText();
    };

    this.goToFilter = function (filterName) {
        var filter = element(by.css("span[data-automation-id='" + filterName + "_filter']"));
        Util.waitUntilElementIsVisible(filter);
        filter.click();
        return this;
    };

    this.sortByName = function (sortOrder) {
        contentList.sortByName(sortOrder);
    };

    this.getAllRowsNameColumn = function () {
        return contentList.getAllRowsColumnValues(nameColumn);
    };

};

module.exports = FiltersPage;
