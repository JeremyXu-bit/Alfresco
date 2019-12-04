/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../../util/util');
var StartTaskDialog = require('./dialog/startTaskDialog');
var FormFields = require('./formFields');
var TaskDetails = require('./taskDetailsPage');
var FiltersPage = require('./filtersPage');
var ChecklistDialog = require('./dialog/createChecklistDialog');
var TasksListPage = require('./tasksListPage');

var TasksPage = function () {

    var createButton = element(by.css("button[data-automation-id='create-button']"));
    var newTaskButton = element(by.css("button[data-automation-id='btn-start-task']"));
    var addChecklistButton = element(by.css("button[class*='adf-add-to-checklist-button']"));
    var rowByRowName = by.xpath("ancestor::mat-chip");
    var checklistContainer = by.css("div[class*='checklist-menu']");
    var taskTitle = "h2[class='activiti-task-details__header'] span";
    var rows = by.css("div[class*='adf-datatable-body'] div[class*='adf-datatable-row'] div[class*='adf-data-table-cell']");


    this.createNewTask = function () {
        this.createButtonIsDisplayed();
        this.clickOnCreateButton();
        this.newTaskButtonIsDisplayed();
        newTaskButton.click();
        return new StartTaskDialog();
    };

    this.createButtonIsDisplayed = function() {
        Util.waitUntilElementIsVisible(createButton);
        return this;
    };

    this.newTaskButtonIsDisplayed = function() {
        Util.waitUntilElementIsVisible(newTaskButton);
        return this;
    };

    this.clickOnCreateButton = function() {
        Util.waitUntilElementIsClickable(createButton);
        createButton.click();
        return this;
    };

    this.usingFormFields = function () {
      return new FormFields();
    };

    this.usingTaskDetails = function () {
        return new TaskDetails();
    };

    this.usingFiltersPage = function () {
        return new FiltersPage();
    };

    this.usingTasksListPage = function () {
        return new TasksListPage();
    };

    this.clickOnAddChecklistButton = function () {
        Util.waitUntilElementIsClickable(addChecklistButton);
        addChecklistButton.click();
        return new ChecklistDialog();
    };

    this.getRowsName = function (name) {
        var row = element(checklistContainer).element(by.cssContainingText("span", name));
        Util.waitUntilElementIsVisible(row);
        return row;
    };

    this.getChecklistByName = function (checklist) {
        var row = this.getRowsName(checklist).element(rowByRowName);
        Util.waitUntilElementIsVisible(row);
        return row;
    };

    this.checkChecklistIsDisplayed = function (checklist) {
        Util.waitUntilElementIsVisible(this.getChecklistByName(checklist));
        return this;
    };

    this.checkTaskTitle = function(taskName) {
        Util.waitUntilElementIsVisible(element(by.css(taskTitle)));
        var title = element(by.cssContainingText(taskTitle, taskName));
        Util.waitUntilElementIsVisible(title);
        return this;
    };

    this.getAllDisplayedRows= function(){
        return element.all(rows).count();
    };

};

module.exports = TasksPage;
