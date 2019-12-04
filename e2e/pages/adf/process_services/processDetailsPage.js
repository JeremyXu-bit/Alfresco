/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../../util/util');

var ProcessDetailsPage = function () {
    const tabs = element.all(by.css('.mat-tab-list'));
    const activityButton = element(by.cssContainingText('Activity'));
    const processStatusField = element(by.css("span[data-automation-id='card-textitem-value-status']"));
    var processEndDateField = element(by.css("span[data-automation-id='card-dateitem-ended']"));
    var processCategoryField = element(by.css("span[data-automation-id='card-textitem-value-category']"));
    var processBusinessKeyField = element(by.css("span[data-automation-id='card-textitem-value-businessKey']"));
    var processCreatedByField = element(by.css("span[data-automation-id='card-textitem-value-assignee']"));
    var processCreatedField = element(by.css("span[data-automation-id='card-dateitem-created']"));
    var processIdField = element(by.css("span[data-automation-id='card-textitem-value-id']"));
    var processDescription = element(by.css("span[data-automation-id='card-textitem-value-description']"));
    var showDiagramButtonDisabled = element(by.css('button[id="show-diagram-button"][disabled]'));
    var propertiesList = element(by.css("div[class='adf-property-list']"));
    const showDiagramButton = element(by.id('show-diagram-button'));
    const commentInput = element(by.id('comment-input'));
    var activeTask = element(by.css('div[data-automation-id="active-tasks"]'));
    var taskTitle = element(by.css("h2[class='activiti-task-details__header']"));

    this.clickTabButton = function (tabNumber) {
        tabs.all(by.className('mat-tab-label')).get(tabNumber).click();

    };

    this.clickActivityButton = function () {
        activityButton.click();
    };

    this.getProcessStatus = function () {
        Util.waitUntilElementIsVisible(processStatusField);
        return processStatusField.getText();
    };

    this.getEndDate = function () {
        Util.waitUntilElementIsVisible(processEndDateField);
        return processEndDateField.getText();
    };

    this.getProcessCategory = function () {
        Util.waitUntilElementIsVisible(processCategoryField);
        return processCategoryField.getText();
    };

    this.getBusinessKey = function () {
        Util.waitUntilElementIsVisible(processBusinessKeyField);
        return processBusinessKeyField.getText();
    };

    this.getCreatedBy = function () {
        Util.waitUntilElementIsVisible(processCreatedByField);
        return processCreatedByField.getText();
    };

    this.getCreated = function () {
        Util.waitUntilElementIsVisible(processCreatedField);
        return processCreatedField.getText();
    };

    this.getId = function () {
        Util.waitUntilElementIsVisible(processIdField);
        return processIdField.getText();
    };

    this.getProcessDescription = function () {
        Util.waitUntilElementIsVisible(processDescription);
        return processDescription.getText();
    };

    this.clickShowDiagram = function () {
        Util.waitUntilElementIsVisible(showDiagramButton);
        Util.waitUntilElementIsClickable(showDiagramButton);
        showDiagramButton.click();
        Util.waitUntilElementIsVisible(diagramCanvas);
        Util.waitUntilElementIsVisible(backButton);
        Util.waitUntilElementIsClickable(backButton);
        backButton.click();
    };

    this.checkShowDiagramIsDisabled = function () {
        Util.waitUntilElementIsVisible(showDiagramButtonDisabled);
    };

    this.addComment = function (comment) {
        Util.waitUntilElementIsVisible(commentInput);
        commentInput.sendKeys(comment);
        commentInput.sendKeys(protractor.Key.ENTER);
        return this;
    };

    this.checkCommentIsDisplayed = function (comment) {
        var commentInserted = element(by.cssContainingText("div[id='comment-message']", comment));
        Util.waitUntilElementIsVisible(commentInserted);
        return this;
    };

    this.checkCommentInputIsNotDisplayed = () =>{
        Util.waitUntilElementIsNotVisible(commentInput);
    };

    this.clickOnActiveTask = function () {
        Util.waitUntilElementIsVisible(activeTask);
        activeTask.click();
    };

    this.checkActiveTaskTitleIsDisplayed = function () {
        Util.waitUntilElementIsVisible(taskTitle);
    };

    this.checkProcessDetailsCard = function () {
        Util.waitUntilElementIsVisible(propertiesList);
    };

};

module.exports = ProcessDetailsPage;
