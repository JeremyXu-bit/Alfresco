/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../../util/util');

var TasksListPage = function () {

    var taskList = element(by.css("adf-tasklist"));
    var tableBody = element.all(by.css("adf-datatable div[class='adf-datatable-body']")).first();

    this.checkTaskIsDisplayedInTasksList = function(taskName) {
        var row = by.cssContainingText("span", taskName);
        Util.waitUntilElementIsVisible(taskList.element(row));
        return this;
    };

    this.selectTaskFromTasksList = function(taskName) {
        var row = by.cssContainingText("span", taskName);
        Util.waitUntilElementIsVisible(taskList.element(row));
        taskList.element(row).click();
        return this;
    };

    this.checkTaskIsNotDisplayedInTasksList = function(taskName) {
        var row = by.cssContainingText("span", taskName);
        Util.waitUntilElementIsNotOnPage(taskList.element(row));
        return this;
    };

    this.checkTaskListIsLoaded = function () {
        Util.waitUntilElementIsVisible(taskList);
        return this;
    };

    this.waitForTableBody = function (){
        Util.waitUntilElementIsVisible(tableBody);
    };

};

module.exports = TasksListPage;
